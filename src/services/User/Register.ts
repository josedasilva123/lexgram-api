import User from "../../models/user";
import bcrypt from "bcryptjs";
import { iRegisterBody, iUser } from "../../routes/User/UserTypes";

export default class UserRegister {
  async execute(body: iRegisterBody) {
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
}
