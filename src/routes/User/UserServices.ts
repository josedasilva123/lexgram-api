import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  iAutoLoginBody,
  iChangePasswordBody,
  iChangePasswordRequestBody,
  iLoginBody,
  iRegisterBody,
  iUser,
  iVerifySlugParams,
} from "./UserTypes";

import { ObjectId } from "mongodb";
import EmailServices from "../../functions/Email/email";

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

  static async VerifySlug(params: iVerifySlugParams) {
    const { slug } = params;
    console.log(slug);
    const existingSlug = await User.findOne({ slug: slug });
    console.log(existingSlug);

    if (existingSlug) {
      throw new Error("O slug já está utilizado por outro usuário.");
    }

    return { message: "Slug disponível." };
  }

  static async ChangePasswordRequest(body: iChangePasswordRequestBody) {
    const { email } = body;

    const existingUser = (await User.findOne({ email: email })) as iUser;

    if (!existingUser) {
      throw new Error("Nenhum usuário vínculado a esse e-mail encontrado.");
    }

    const secretKey = process.env.JWT_SECRET_RECOVER;

    if (!secretKey) {
      throw new Error("Falha na API: contate o responsável pela aplicação");
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      secretKey,
      { expiresIn: 900 }
    );

    const recoverURL = `${process.env.BASE_URL}/recoverpassword?recover=${token}`;

    EmailServices.SendEmail({
      from: process.env.SENDGRID_MAIL as string,
      to: email,
      subject: "Recuperar Senha: Lexgram",
      text: "Este é o e-mail de recuperação de senha da plataforma Lexgram",
      html: `
        <h1>Recupere sua senha</h1>
        <br/>
        <p>Você pode recuperar sua senha por meio do link abaixo (lembrando que ele expira em 15 minutos):</p>
        <br/>
        <p><a href="${recoverURL}">Recuperar senha</a></p>
      `,
    });

    return { message: "Solicitação de senha recuperação de senha executada com sucesso!" };
  }

  static async ChangePassword(body: iChangePasswordBody) {
    const { decodedID, password } = body;

    const userID = new ObjectId(decodedID);

    const existingUser = (await User.findOne({ _id: userID })) as iUser;

    if (!existingUser) {
      throw new Error("Nenhum usuário vínculado a esse e-mail encontrado.");
    }

    const newPassword = bcrypt.hashSync(password, 1);

    await User.updateOne(
      { _id: existingUser._id },
      {
        $set: {
          password: newPassword,
        },
      }
    );

    return { message: 'Senha alterada com sucesso!'}
  }
}
