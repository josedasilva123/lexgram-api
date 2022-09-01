import { ObjectId } from "mongodb";
import { iFollower, iUser } from "../User/user";
import { iFollowBody } from "./FollowerTypes";
import User from "../../models/user";



export default class FollowerServices {
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

    await User.updateOne(
      { _id: objectUserID },
      {
        $set: {
          follow: [...followList, newFollow],
        },
      }
    );

    await User.updateOne(
      { _id: objectFollowID },
      {
        $set: {
          followers: [...followerList, newFollower],
        },
      }
    );

    const response = {
      message: "Seguir executado com sucesso!",
      follow: newFollow,
      follower: newFollower,
    };

    return response;
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

    await User.updateOne(
      { _id: objectUserID },
      {
        $set: {
          follow: newFollowList,
        },
      }
    );

    await User.updateOne(
      { _id: objectFollowID },
      {
        $set: {
          followers: newFollowerList,
        },
      }
    );

    return {
      message: "Não seguir executado com sucesso!",
      follow: newFollowList,
      follower: newFollowerList,
    };
  }
}
