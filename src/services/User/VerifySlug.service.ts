import User from "../../models/user";
import { iVerifySlugParams } from "../../routes/User/UserTypes";

export class UserVerifySlug {
  async execute(params: iVerifySlugParams) {
    const { slug } = params;

    const existingSlug = await User.findOne({ slug: slug });

    if (existingSlug) {
      throw new Error("O slug já está utilizado por outro usuário.");
    }

    return { message: "Slug disponível." };
  }
}
