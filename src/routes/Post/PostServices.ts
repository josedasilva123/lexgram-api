import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import sharp from "sharp";
import {
  deleteServerFile,
  uploadFile,
} from "../../functions/googledrive/fileupload";
import { nextPage } from "../../functions/utils/pagination";
import { iCreateBody, iPostGetQuery } from "./PostTypes";
import { iUser, iFollower } from "../User/user";

import Post from "../../models/post";
import User from "../../models/user";

export default class PostServices {
  private static async FindPosts(query: any, { user, page, perPage }: iPostGetQuery) {
    if (user && page && perPage) {
      const count = await Post.find(query).count();

      const skip = Number(page) * Number(perPage);

      const next = nextPage("", count, user, page, perPage);

      const posts = await Post.find(query).skip(skip).limit(Number(perPage));

      return { count, next, posts };
    }
  }

  static async Create(body: iCreateBody, file: Express.Multer.File) {
    const { userID, description } = body;

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

    return { message: "Post criado com sucesso!", post: response };
  }

  static async GetFollowersPosts(query: iPostGetQuery) {
    const { user, page, perPage } = query;

    if (!user || !page || !perPage) {
      throw new Error(
        "Parece que algum parâmetro obrigatório da query está faltando."
      );
    }

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

    const dbQuery = {
      userID: { $in: [...followersID] },
    };

    const postPage = this.FindPosts(dbQuery, query);

    return postPage;
  }

  static async GetUserPosts(query: iPostGetQuery) {
    const { user, page, perPage } = query;

    if (!user || !page || !perPage) {
      throw new Error(
        "Parece que algum parâmetro obrigatório da query está faltando."
      );
    }

    const dbQuery = {
      userID: user,
    };

    const postPage = this.FindPosts(dbQuery, query);

    return postPage;
  }
}
