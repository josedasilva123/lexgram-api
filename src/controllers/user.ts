import { Request, Response } from "express";
import { UserAutoLogin, UserLogin, UserRegister } from "../services/user";

export const USER_REGISTER = (req: Request, res: Response) => {
  const { name, email, password, slug } = req.body;

  if (!name || !email || !password || !slug) {
    res.status(400).json({
      error: "Parece que algum parâmetro obrigatório do body está faltando.",
    });
  } else {
    UserRegister(req, res);
  }
};

export const USER_LOGIN = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Parece que algum parâmetro obrigatório do body está faltando.",
    });
  } else {
    UserLogin(req, res);
  }
};

export const USER_AUTOLOGIN = async (req: Request, res: Response) => {
  UserAutoLogin(req, res);
};
