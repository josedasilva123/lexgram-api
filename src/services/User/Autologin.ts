import User from "../../models/user";
import { ObjectId } from "mongodb";
import { iAutoLoginBody, iUser } from "../../routes/User/UserTypes";

export class UserAutoLogin {
  async execute(body: iAutoLoginBody) {
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
}
