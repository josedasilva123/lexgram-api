import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { iLoginBody, iUser } from "../../routes/User/UserTypes";

export default class UserLogin {
  async execute(body: iLoginBody) {
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
}
