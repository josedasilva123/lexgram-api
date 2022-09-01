import { Request, Response } from "express";

import {
  iAutoLoginBody,
  iVerifySlugQuery,
  iLoginBody,
  iLoginSucessResponse,
  iRegisterBody,
  iRegisterSucessResponse,
  iVerifySlugSucessResponse,
} from "./UserTypes";

import { iErrorResponse } from "../../interfaces/global";

import UserServices from "./UserServices";

export default class UserControllers {
  static async Register(
    req: Request<{}, {}, iRegisterBody, {}>,
    res: Response<iRegisterSucessResponse | iErrorResponse>
  ) {
    try {
      const response = await UserServices.Register(req.body);
      return response;
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async Login(
    req: Request<{}, {}, iLoginBody, {}>,
    res: Response<iLoginSucessResponse | iErrorResponse>
  ) {
    try {
      const response = await UserServices.Login(req.body);
      return response;
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async AutoLogin(
    req: Request<{}, {}, iAutoLoginBody, {}>,
    res: Response<iLoginSucessResponse | iErrorResponse>
  ) {
    try {
      const response = await UserServices.AutoLogin(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async VerifySlug(
    req: Request<{}, {}, {}, iVerifySlugQuery>,
    res: Response<iVerifySlugSucessResponse | iErrorResponse>
  ) {
    try {
      const response = await UserServices.VerifySlug(req.query);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
