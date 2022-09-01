import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import sharp from "sharp";
import { deleteServerFile, uploadFile } from "../../functions/googledrive/fileupload";
import { nextPage } from "../../functions/utils/pagination";
import { iPostGetQuery } from "../../interfaces/post";
import { iUser, iFollower } from "../../interfaces/user";

import Post from "../../models/post";
import User from "../../models/user";

export default class PostServices {
  static async Create(req: Request, res: Response) {
    const { userID, description } = req.body;

    const file = req.file;

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

    const compressedFile = {
      ...file,
      path: "uploads\\webp\\" + file.filename,
    };

    deleteServerFile(file.path);

    const upload: any = await uploadFile(compressedFile);

    deleteServerFile(compressedFile.path);

    if (!upload) {
      throw new Error("Desculpe! Não foi possível realizar o upload!");
    }

    const newPost = {
      userID,
      image: upload.data.image,
      description,
    };

    const response = await Post.create(newPost);

    res
      .status(200)
      .json({ message: "Post criado com sucesso!", post: response });
  }

  static async GetFollowersPosts(
    req: Request<{}, {}, {}, iPostGetQuery>,
    res: Response
  ) {
    const { user, page, perPage } = req.query;

    if (!user || !page || !perPage) {
      throw new Error(
        "Parece que algum parâmetro obrigatório da query está faltando."
      );
    }

    const skip = Number(page) * Number(perPage);

    const objectUserID = new ObjectId(String(user));

    const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;

    if (!currentUser) {
      throw new Error("O usuário fornecido é inválido!");
    }

    const followersID = currentUser.followers
      ? currentUser.followers.map((follower: iFollower) => {
          return follower.userID;
        })
      : [];

    const query = {
      userID: { $in: [...followersID] },
    };

    const count = await Post.find(query).count();

    const next = nextPage("", count, user, page, perPage);

    const posts = await Post.find(query).skip(skip).limit(Number(perPage));

    res.status(200).json({ count, next, posts });
  }

  static async GetUserPosts(
    req: Request<{}, {}, {}, iPostGetQuery>,
    res: Response
  ) {
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

    const next = nextPage("", count, user, page, perPage);

    const posts = await Post.find(query).skip(skip).limit(Number(perPage));

    res.status(200).json({ count, next, posts });
  }
}
