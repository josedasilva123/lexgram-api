import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import User from "../models/user";


export const UserRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, slug } = req.body;

    const existingEmail = await User.findOne({ email: email });
    const existingSlug = await User.findOne({ email: email });

    if (existingEmail) {
      throw new Error("O e-mail fornecido já pertece a um usuário cadastrado.");
    }

    if (existingSlug) {
      throw new Error("O slug já pertence a usuário cadastrado.");
    }

    const currentDate = new Date();

    const newUser = {
      name,
      email,
      password: bcrypt.hashSync(password, 1),
      slug,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    await User.create(newUser);

    res.status(200).json({ message: "Cadastrado realizado com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const UserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      throw new Error("Nenhum usuário vínculado a esse e-mail encontrado.");
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
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
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        slug: existingUser.slug,
        createAt: existingUser.createAt,
        updateAt: existingUser.updateAt,
        profileImage: existingUser.profileImage,
        profileBio: existingUser.profileBio,
        notifications: existingUser.notifications,
        follow: existingUser.follow,
        followers: existingUser.followers,
      },
      token: token,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const UserAutoLogin = async (req: Request, res: Response) => {
  try {
    const { decodedID } = req.body;

    const userID = new ObjectId(decodedID);

    const existingUser = await User.findOne({ _id: userID });

    if (!existingUser) {
      throw new Error("Usuário não encontrado.");
    }

    res.status(200).json({
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        slug: existingUser.slug,
        createAt: existingUser.createAt,
        updateAt: existingUser.updateAt,
        profileImage: existingUser.profileImage,
        profileBio: existingUser.profileBio,
        notifications: existingUser.notifications,
        follow: existingUser.follow,
        followers: existingUser.followers,
      },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
