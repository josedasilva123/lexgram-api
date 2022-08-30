import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { iFollowBody, iUnfollowBody } from "../interfaces/follower";
import { iFollower, iUser } from "../interfaces/user";

import User from "../models/user";

export default class FollowerControllers {
  static async Follow(req: Request<{}, {}, iFollowBody, {}>, res: Response) {
    try {
      const { userID, followID } = req.body;

      const objectUserID = new ObjectId(String(userID));
      const objectFollowID = new ObjectId(String(followID));

      const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
      const currentFollow = (await User.findOne({ _id: objectFollowID })) as iUser;

      if (!currentUser || !currentFollow) {
        throw new Error(
          "O usuário atual ou usuário a ser seguido são inválidos"
        );
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

      res.status(200).json({
        message: "Seguir executado com sucesso!",
        follow: newFollow,
        follower: newFollower,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async Unfollow(req: Request<{}, {}, iUnfollowBody, {}>, res: Response) {
    try {
      const { userID, followID } = req.body;
      const objectUserID = new ObjectId(String(userID));
      const objectFollowID = new ObjectId(String(followID));

      const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
      const currentFollow = (await User.findOne({ _id: objectFollowID })) as iUser;

      if (!currentUser || !currentFollow) {
        throw new Error(
          "O usuário atual ou usuário a ser seguido são inválidos"
        );
      }

      if(!currentUser.follow?.find((f: iFollower) => f.userID === followID)){
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

      res.status(200).json({
        message: "Não seguir executado com sucesso!",
        follow: newFollowList,
        follower: newFollowerList,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
