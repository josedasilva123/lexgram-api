import { ObjectId } from "mongodb";
import { iFollower, iUser } from "../User/UserTypes"
import { iFollowBody, iUpdateQuery } from "./FollowerTypes";
import User from "../../models/user";

export default class FollowerServices {
  private static async UpdateUsers(userQueries: iUpdateQuery[]){
    userQueries.forEach(async (user) => {
      await User.updateOne(
        { _id: user.id },
        user.set
      );
    }) 
  }

  static async Follow(body: iFollowBody) {
    const { userID, followID } = body;

    const objectUserID = new ObjectId(String(userID));
    const objectFollowID = new ObjectId(String(followID));

    const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
    const currentFollow = (await User.findOne({
      _id: objectFollowID,
    })) as iUser;

    if (!currentUser || !currentFollow) {
      throw new Error("O usuário atual ou usuário a ser seguido são inválidos");
    }

    if (
      currentUser.follow &&
      currentUser.follow.find((f: iFollower) => f.userID === followID)
    ) {
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

    await this.UpdateUsers([followQuery, followQuery])


    return {
      message: "Seguir executado com sucesso!",
      follow: newFollow,
      follower: newFollower,
    };
  }

  static async Unfollow(body: iFollowBody) {
    const { userID, followID } = body;

    const objectUserID = new ObjectId(String(userID));
    const objectFollowID = new ObjectId(String(followID));

    const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
    const currentFollow = (await User.findOne({
      _id: objectFollowID,
    })) as iUser;

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

    await this.UpdateUsers([followQuery, followerQuery]);

    return {
      message: "Não seguir executado com sucesso!",
      follow: newFollowList,
      follower: newFollowerList,
    };
  }
}
