import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { FollowBody, UnfollowBody } from "../interfaces/follower";
import { iFollower, iUser } from "../interfaces/user";
import User from "../models/user";

export default class FollowerControllers {
  static async Follow(req: Request<{}, {}, FollowBody, {}>, res: Response) {
    try {
      const { userID, followID, userName, followName, userSlug, followSlug } =
        req.body;

      const objectUserID = new ObjectId(String(userID));
      const objectFollowID = new ObjectId(String(followID));

      const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;
      const currentFollow = (await User.findOne({
        _id: objectFollowID,
      })) as iUser;

      if (!currentUser || !currentFollow) {
        throw new Error(
          "O usuário atual ou usuário a ser seguido são inválidos"
        );
      }

      const existingFollow = await User.find({
        follow: {
          $elemMatch: [
            { userID: followID, userName: followName, userSlug: followSlug },
          ],
        },
      });

      if (existingFollow) {
        throw new Error("Este perfil já está sendo seguido.");
      }

      const newFollow = {
        userID: followID,
        userName: followName,
        userSlug: followSlug,
      };

      const newFollower = {
        userID: userID,
        userName: userName,
        userSlug: userSlug,
      };

      const followList = currentUser.follow ? currentUser.follow : [];

      const followerList = currentFollow.followers
        ? currentFollow.followers
        : [];

      await User.updateOne(
        { slug: userSlug },
        {
          $set: {
            follow: [...followList, newFollow],
          },
        }
      );

      await User.updateOne(
        { slug: followSlug },
        {
          $set: {
            follower: [...followerList, newFollower],
          },
        }
      );

      res
        .status(200)
        .json({
          message: "Seguir executado com sucesso!",
          follow: newFollow,
          follower: newFollower,
        });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async Unfollow(req: Request<{}, {}, UnfollowBody, {}>, res: Response) {
    try {
      const { userID, followID } = req.body;
      const objectUserID = new ObjectId(String(userID));
      const objectFollowID = new ObjectId(String(followID));

      const currentUser: any = await User.find({ _id: objectUserID });
      const currentFollow: any = await User.find({ _id: objectFollowID });

      if (!currentUser || !currentFollow) {
        throw new Error(
          "O usuário atual ou usuário a ser seguido são inválidos"
        );
      }

      const existingFollow = await User.find({ follow: { $in: [followID] } });

      if (!existingFollow) {
        throw new Error("Este perfil não está sendo seguido.");
      }

      const newFollowList = currentUser.follow.filter(
        (f: iFollower) => f.userID !== followID
      );

      const newFollowerList = currentFollow.followers.filter(
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
            follower: newFollowerList,
          },
        }
      );
      res
        .status(200)
        .json({
          message: "Seguir executado com sucesso!",
          follow: newFollowList,
          follower: newFollowerList,
        });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
