import { Request, Response } from "express";

import {
  iAutoLoginBody,
  iLoginBody,
  iLoginSucessResponse,
  iRegisterBody,
  iRegisterSucessResponse,
  iVerifySlugSucessResponse,
  iChangePasswordRequestSucessResponse,
  iChangePasswordRequestBody,
  iChangePasswordBody,
  iVerifySlugParams,
} from "./UserTypes";

import { iErrorResponse } from "../../interfaces/global";

import UserServices from "./UserServices";
import UserRegister from "../../services/User/Register";
import UserLogin from "../../services/User/Login";

export default class UserControllers {
  static async Register(
    req: Request<{}, {}, iRegisterBody, {}>,
    res: Response<iRegisterSucessResponse | iErrorResponse>
  ) {
    const register = new UserRegister();
    const response = await register.execute(req.body);
    res.status(200).json(response);
  }

  static async Login(
    req: Request<{}, {}, iLoginBody, {}>,
    res: Response<iLoginSucessResponse | iErrorResponse>
  ) {
    const login = new UserLogin();
    const response = await login.execute(req.body);
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
    req: Request<iVerifySlugParams, {}, {}, {}>,
    res: Response<iVerifySlugSucessResponse | iErrorResponse>
  ) {
    const response = await UserServices.VerifySlug(req.params);
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
