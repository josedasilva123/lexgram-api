import { Request, response, Response } from "express";

import { deleteServerFile, uploadFile } from "../functions/googledrive/fileupload";
import sharp from "sharp";

import User, { iFollower } from "../models/user";
import Post from "../models/post";
import { ObjectId } from "mongodb";
import { nextPage } from "../functions/utils/pagination";

interface iPostGetQuery{
  user: string;
  page: string;
  perPage: string;
}

export const POST_CREATE = async (req: Request, res: Response) => {
  try {
    const { userID, description } = req.body;

    const file = req.file;

    if (!userID || !description) {
      throw new Error(
        "Parece que algum parâmetro obrigatório do body está faltando."
      );
    }

    if (!file) {
      throw new Error("Arquivo enviando inválido.");
    }

    await sharp(file.path)
      .resize({
        fit: sharp.fit.contain,
        width: 1000,
      })
      .webp({ quality: 50 })
      .toFile(`uploads/webp/${file.filename}`);

    const compressedFile = { ...file, path: "uploads\\webp\\" + file.filename };

    deleteServerFile(file.path);

    const upload: any = await uploadFile(compressedFile);

    deleteServerFile(compressedFile.path);

    if (!upload) {
      throw new Error("Desculpe! Não foi possível realizar o upload!");
    }

    const currentDate = new Date();

    const newPost = {
      userID,
      image: upload.data.image,
      description,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const response = await Post.create(newPost);

    res
      .status(200)
      .json({ message: "Post criado com sucesso!", post: response });
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};

export const FOLLOWERS_POSTS_GET = async (req: Request<{},{},{}, iPostGetQuery>, res: Response) => {
  try {
    const { user, page, perPage } = req.query;

    if (!user || !page || !perPage) {
      throw new Error(
        "Parece que algum parâmetro obrigatório da query está faltando."
      );
    }

    const skip = Number(page) * Number(perPage);

    const objectUserID = new ObjectId(String(user));

    const currentUser: any = await User.find({ _id: objectUserID });

    if (!currentUser) {
      throw new Error("O usuário fornecido é inválido!");
    }

    const followersID = currentUser.followers.map((follower: iFollower) => {
      return follower.userID;
    });

    const query = {
      userID: { $in: [...followersID] },
    };

    const count = await Post.find(query).count();

    const next = nextPage('', count, user, page, perPage);

    const response = await Post.find(query).skip(skip).limit(Number(perPage));

    res.status(200).json({ count, next, posts: response });
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};

export const USER_POSTS_GET = async (req: Request<{},{},{}, iPostGetQuery>, res: Response) => {
  try {
    const { user, page, perPage } = req.query;

    if (!user || !page || !perPage) {
      throw new Error(
        "Parece que algum parâmetro obrigatório da query está faltando."
      );
    }

    const query = {
      userID: user,
    };

    const count = await Post.find(query).count();

    const skip = Number(page) * Number(perPage);

    const next = nextPage('', count, user, page, perPage);

    const response = await Post.find(query).skip(skip).limit(Number(perPage));

    res.status(200).json({ count, next, posts: response });
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};