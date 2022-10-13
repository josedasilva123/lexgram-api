import User from "../../models/user";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { iChangePasswordBody, iUser } from "../../routes/User/UserTypes";

export class UserChangePassword {
  async execute(body: iChangePasswordBody) {
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
