import { Request, Response } from "express";

import {
  iAutoLoginBody,
  iVerifySlugQuery,
  iLoginBody,
  iLoginSucessResponse,
  iRegisterBody,
  iRegisterSucessResponse,
  iVerifySlugSucessResponse,
  iChangePasswordRequestSucessResponse,
  iChangePasswordRequestBody,
  iChangePasswordBody,
} from "./UserTypes";

import { iErrorResponse } from "../../interfaces/global";

import UserServices from "./UserServices";

export default class UserControllers {
  static async Register(
    req: Request<{}, {}, iRegisterBody, {}>,
    res: Response<iRegisterSucessResponse | iErrorResponse>
  ) {
    const response = await UserServices.Register(req.body);
    res.status(200).json(response);
  }

  static async Login(
    req: Request<{}, {}, iLoginBody, {}>,
    res: Response<iLoginSucessResponse | iErrorResponse>
  ) {
    const response = await UserServices.Login(req.body);
    res.status(200).json(response);
  }

  static async AutoLogin(
    req: Request<{}, {}, iAutoLoginBody, {}>,
    res: Response<iLoginSucessResponse | iErrorResponse>
  ) {
    const response = await UserServices.AutoLogin(req.body);
    res.status(200).json(response);
  }

  static async VerifySlug(
    req: Request<{}, {}, {}, iVerifySlugQuery>,
    res: Response<iVerifySlugSucessResponse | iErrorResponse>
  ) {
    const response = await UserServices.VerifySlug(req.query);
    res.status(200).json(response);
  }

  static async ChangePasswordRequest(
    req: Request<{}, {}, iChangePasswordRequestBody, {}>,
    res: Response<iChangePasswordRequestSucessResponse | iErrorResponse>
  ) {
    const response = await UserServices.ChangePasswordRequest(req.body);
    res.status(200).json(response);
  }

  static async ChangePassword(
    req: Request<{}, {}, iChangePasswordBody, {}>,
    res: Response<iChangePasswordRequestSucessResponse | iErrorResponse>
  ) {
    const response = await UserServices.ChangePassword(req.body);
    res.status(200).json(response);
  }
}
