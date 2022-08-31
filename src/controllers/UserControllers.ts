import { Request, Response } from "express";

import { iAutoLoginBody, iVerifySlugQuery, iLoginBody, iLoginSucessResponse, iRegisterBody, iRegisterSucessResponse, iVerifySlugSucessResponse} from "../interfaces/user";
import { iErrorResponse } from "../interfaces/global";

import UserServices from "../services/UserServices";

export default class UserControllers {
  static async Register(req: Request<{}, {}, iRegisterBody, {}>, res: Response<iRegisterSucessResponse | iErrorResponse>) {
    try {
      await UserServices.Register(req, res);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async Login(req: Request<{}, {}, iLoginBody, {}>, res: Response<iLoginSucessResponse | iErrorResponse>) {
    try {
      await UserServices.Login(req, res);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async AutoLogin(req: Request<{}, {}, iAutoLoginBody, {}>, res: Response<iLoginSucessResponse | iErrorResponse>) {
    try {
      await UserServices.AutoLogin(req, res);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async VerifySlug(req: Request<{},{},{}, iVerifySlugQuery>, res: Response<iVerifySlugSucessResponse | iErrorResponse>) {
    try {
      await UserServices.VerifySlug(req, res);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
