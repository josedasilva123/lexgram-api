import { Request, Response } from "express";
import { iPostGetQuery } from "../interfaces/post";
import { FollowersGetPost, PostCreate, UserGetPost } from "../services/post";

export const POST_CREATE = async (req: Request, res: Response) => {
  const { userID, description } = req.body;

  if (!userID || !description) {
    res.status(400).json({
      error: "Parece que algum parâmetro obrigatório da query está faltando.",
    });
  } else {
    PostCreate(req, res);
  }  
};

export const FOLLOWERS_POSTS_GET = async (
  req: Request<{}, {}, {}, iPostGetQuery>,
  res: Response
) => {
  const { user, page, perPage } = req.query;

  if (!user || !page || !perPage) {
    res.status(400).json({
      error: "Parece que algum parâmetro obrigatório da query está faltando.",
    });
  } else {
    FollowersGetPost(req, res);
  }    
};

export const USER_POSTS_GET = async (
  req: Request<{}, {}, {}, iPostGetQuery>,
  res: Response
) => {
  const { user, page, perPage } = req.query;

  if (!user || !page || !perPage) {
    res.status(400).json({
      error: "Parece que algum parâmetro obrigatório da query está faltando.",
    });
  } else {
    UserGetPost(req, res);
  }   
};
