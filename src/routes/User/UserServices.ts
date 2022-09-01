import { Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  iAutoLoginBody,
  iLoginBody,
  iLoginSucessResponse,
  iRegisterBody,
  iUser,
  iVerifySlugQuery,
} from "./UserTypes";
import { iErrorResponse } from "../../interfaces/global";
import { ObjectId } from "mongodb";

export default class UserServices {
  static async Register(body: iRegisterBody) {
    const { name, email, password, slug } = body;

    const existingEmail = (await User.findOne({ email: email })) as iUser;
    const existingSlug = (await User.findOne({ slug: slug })) as iUser;

    if (existingEmail) {
      throw new Error("O e-mail fornecido já pertece a um usuário cadastrado.");
    }

    if (existingSlug) {
      throw new Error("O slug já pertence a usuário cadastrado.");
    }

    const newUser = {
      name,
      email,
      password: bcrypt.hashSync(password, 1),
      slug,
    };

    await User.create(newUser);

    return { message: "Cadastrado realizado com sucesso!" };
  }

  static async Login(body: iLoginBody) {
    const { email, password } = body;

    const existingUser = (await User.findOne({ email: email })) as iUser;

    if (!existingUser) {
      throw new Error("Nenhum usuário vínculado a esse e-mail encontrado.");
    }

    if (
      existingUser.password &&
      !bcrypt.compareSync(password, existingUser.password)
    ) {
      throw new Error("E-mail e senha não correspondem.");
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("Falha na API: contate o responsável pela aplicação");
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      secretKey,
      { expiresIn: "12h" }
    );

    return {
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        slug: existingUser.slug,
        profileImage: existingUser.profileImage,
        profileBio: existingUser.profileBio,
        notifications: existingUser.notifications,
        follow: existingUser.follow,
        followers: existingUser.followers,
      },
      token: token,
    };
  }

  static async AutoLogin(body: iAutoLoginBody) {
    const { decodedID } = body;

    const userID = new ObjectId(decodedID);

    const existingUser = (await User.findOne({ _id: userID })) as iUser;

    if (!existingUser) {
      throw new Error("Usuário não encontrado.");
    }

    return {
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        slug: existingUser.slug,
        profileImage: existingUser.profileImage,
        profileBio: existingUser.profileBio,
        notifications: existingUser.notifications,
        follow: existingUser.follow,
        followers: existingUser.followers,
      },
    };
  }

  static async VerifySlug(query: iVerifySlugQuery) {
    const { slug } = query;
    const existingSlug = await User.findOne({ slug: slug });

    if (existingSlug) {
      throw new Error("O slug já está utilizado por outro usuário.");
    }

    return { message: "Slug disponível." };
  }
}
