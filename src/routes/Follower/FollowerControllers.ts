import { Request, Response } from "express";

import { FollowerFollow } from "../../services/Follower/Follow";
import { FollowerUnfollow } from "../../services/Follower/Unfollow";
import { iFollowBody } from "./FollowerTypes";

export default class FollowerControllers {
  static async Follow(req: Request<{}, {}, iFollowBody, {}>, res: Response) {
    const follow = new FollowerFollow();
    const response = await follow.execute(req.body);

    res.status(200).json(response);
  }

  static async Unfollow(req: Request<{}, {}, iFollowBody, {}>, res: Response) {
    const unfollow = new FollowerUnfollow();
    const response = await unfollow.execute(req.body);

    res.status(200).json(response);
  }
}
