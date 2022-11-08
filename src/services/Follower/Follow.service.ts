import User from "../../models/user";
import { ObjectId } from "mongodb";
import { UserUpdate } from "../User/Update.service";
import { iFollowBody } from "../../routes/Follower/FollowerTypes";
import { iUser, iFollower } from "../../routes/User/UserTypes";


export class FollowerFollow extends UserUpdate {
  async execute(body: iFollowBody) {
    const { userID, followID } = body;

    const objectUserID = new ObjectId(String(userID));
    const objectFollowID = new ObjectId(String(followID));

    const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
    const currentFollow = (await User.findOne({ _id: objectFollowID })) as iUser;

    if (!currentUser || !currentFollow) {
      throw new Error("O usuário atual ou usuário a ser seguido são inválidos");
    }

    if (currentUser.follow && currentUser.follow.find((f: iFollower) => f.userID === followID)) {
      throw new Error("Este perfil já está sendo seguido.");
    }

    const newFollow = {
      userID: String(currentFollow._id),
      userName: currentFollow.name,
      userSlug: currentFollow.slug,
    };

    const newFollower = {
      userID: String(currentUser._id),
      userName: currentUser.name,
      userSlug: currentUser.slug,
    };

    const followList = currentUser.follow ? currentUser.follow : [];

    const followerList = currentFollow.followers ? currentFollow.followers : [];

    const followQuery = {
      id: objectUserID,
      set: {
        $set: {
          follow: [...followList, newFollow],
        },
      }
    }

    const followerQuery = {
      id: objectFollowID,
      set: {
        $set: {
          followers: [...followerList, newFollower],
        },
      }
    }

    await this.UserUpdate([followQuery, followerQuery])


    return {
      message: "Seguir executado com sucesso!",
      follow: newFollow,
      follower: newFollower,
    };
  }
}
