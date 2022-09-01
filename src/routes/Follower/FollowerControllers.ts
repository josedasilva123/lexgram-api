import { Request, Response } from "express";

import FollowerServices from "./FollowerServices";

import { iFollowBody } from "./FollowerTypes";

export default class FollowerControllers {
  static async Follow(req: Request<{}, {}, iFollowBody, {}>, res: Response) {
    try {
      const response = await FollowerServices.Follow(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async Unfollow(req: Request<{}, {}, iFollowBody, {}>, res: Response) {
    try {
      const response = await FollowerServices.Unfollow(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
