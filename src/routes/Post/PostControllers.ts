import { Request, Response } from "express";
import { iCreateBody, iPostGetQuery } from "./PostTypes";

import PostServices from "./PostServices";

export default class PostControllers {
  static async Create(req: Request<{}, {}, iCreateBody, {}>, res: Response) {
    try {
      const response = await PostServices.Create(
        req.body,
        req.file as Express.Multer.File
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async GetFollowersPosts(
    req: Request<{}, {}, {}, iPostGetQuery>,
    res: Response
  ) {
    try {
      const response = await PostServices.GetFollowersPosts(req.query);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async GetUserPosts(
    req: Request<{}, {}, {}, iPostGetQuery>,
    res: Response
  ) {
    try {
      const response = await PostServices.GetUserPosts(req.query);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
