import { Request, Response } from "express";

import { iCreateBody, iPostGetQuery } from "./PostTypes";
import { PostCreate } from "../../services/Post/Create.service";
import { PostGetFollowersPosts } from "../../services/Post/GetFollowerPosts.service";
import { PostGetUserPosts } from "../../services/Post/GetUserPosts.service";

export default class PostControllers {
  static async Create(req: Request<{}, {}, iCreateBody, {}>, res: Response) {
    const create = new PostCreate();
    const response = await create.execute(
      req.body,
      req.file as Express.Multer.File
    );

    res.status(200).json(response);
  }

  static async GetFollowersPosts(
    req: Request<{}, {}, {}, iPostGetQuery>,
    res: Response
  ) {
    const get = new PostGetFollowersPosts();
    const response = await get.execute(req.query);

    res.status(200).json(response);
  }

  static async GetUserPosts(
    req: Request<{}, {}, {}, iPostGetQuery>,
    res: Response
  ) {
    const get = new PostGetUserPosts();
    const response = await get.execute(req.query);

    res.status(200).json(response);
  }
}
