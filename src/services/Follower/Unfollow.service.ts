import User from "../../models/user";
import { ObjectId } from "mongodb";
import { UserUpdate } from "../User/Update.service";
import { iFollowBody } from "../../routes/Follower/FollowerTypes";
import { iUser, iFollower } from "../../routes/User/UserTypes";

export class FollowerUnfollow extends UserUpdate {
  async execute(body: iFollowBody) {
    const { userID, followID } = body;

    const objectUserID = new ObjectId(String(userID));
    const objectFollowID = new ObjectId(String(followID));

    const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
    const currentFollow = (await User.findOne({ _id: objectFollowID })) as iUser;

    if (!currentUser || !currentFollow) {
      throw new Error("O usuário atual ou usuário a ser seguido são inválidos");
    }

    if (!currentUser.follow?.find((f: iFollower) => f.userID === followID)) {
      throw new Error("Este usuário não está sendo seguido.");
    }

    const newFollowList = currentUser.follow?.filter(
      (f: iFollower) => f.userID !== followID
    );

    const newFollowerList = currentFollow.followers?.filter(
      (f: iFollower) => f.userID !== userID
    );

    const followQuery = {
      id: objectUserID,
      set: {
        $set: {
          follow: newFollowList,
        },
      }
    }

    const followerQuery = {
      id: objectFollowID,
      set: {
        $set: {
          followers: newFollowerList,
        },
      }
    }

    await this.UserUpdate([followQuery, followerQuery]);

    return {
      message: "Não seguir executado com sucesso!",
      follow: newFollowList,
      follower: newFollowerList,
    };
  }
}
