import { Request, Response } from "express";
import { iPostGetQuery } from "../../interfaces/post";

import PostServices from "./PostServices";

export default class PostControllers {
  static async Create(req: Request, res: Response) {
    try {
      await PostServices.Create(req, res);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async GetFollowersPosts(
    req: Request<{}, {}, {}, iPostGetQuery>,
    res: Response
  ) {
    try {
      await PostServices.GetFollowersPosts(req, res);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async GetUserPosts(
    req: Request<{}, {}, {}, iPostGetQuery>,
    res: Response
  ) {
    try {
      await PostServices.GetUserPosts(req, res);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
