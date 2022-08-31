import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  iAutoLoginBody,
  iLoginBody,
  iLoginSucessResponse,
  iRegisterBody,
  iRegisterSucessResponse,
  iVerifySlugQuery,
  iVerifySlugSucessResponse,
} from "../interfaces/user";

import { iErrorResponse } from "../interfaces/global";
import { ObjectId } from "mongodb";

export default class UserServices {
  static async Register(
    req: Request<{}, {}, iRegisterBody, {}>,
    res: Response<iRegisterSucessResponse | iErrorResponse>
  ) {
    const { name, email, password, slug } = req.body;

    const existingEmail = await User.findOne({ email: email });
    const existingSlug = await User.findOne({ slug: slug });

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

    res.status(200).json({ message: "Cadastrado realizado com sucesso!" });
  }

  static async Login(
    req: Request<{}, {}, iLoginBody, {}>,
    res: Response<iLoginSucessResponse | iErrorResponse>
  ) {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

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

    res.status(200).json({
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
    });
  }

  static async AutoLogin(
    req: Request<{}, {}, iAutoLoginBody, {}>,
    res: Response<iLoginSucessResponse | iErrorResponse>
  ) {
    const { decodedID } = req.body;

    const userID = new ObjectId(decodedID);

    const existingUser = await User.findOne({ _id: userID });

    if (!existingUser) {
      throw new Error("Usuário não encontrado.");
    }

    res.status(200).json({
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
    });
  }

  static async VerifySlug(req: Request<{},{},{}, iVerifySlugQuery>, res: Response<iVerifySlugSucessResponse | iErrorResponse>){
    const { slug } = req.query;
    const existingSlug = await User.findOne({ slug: slug });

    if(existingSlug){
      throw new Error("O slug já está utilizado por outro usuário.")
    }

    res.status(200).json({ message: "Slug disponível."})
  }
}
