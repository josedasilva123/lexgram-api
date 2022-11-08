import User from "../../models/user";
import jwt from "jsonwebtoken";
import { EmailSend } from "../Email/Send.service";
import { iChangePasswordRequestBody, iUser } from "../../routes/User/UserTypes";

export class UserChangePasswordRequest {
  async execute(body: iChangePasswordRequestBody) {
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

    const send = new EmailSend();

    await send.execute({
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

    return {
      message:
        "Solicitação de senha recuperação de senha executada com sucesso!",
    };
  }
}
