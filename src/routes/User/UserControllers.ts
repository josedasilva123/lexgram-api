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
import { UserLogin } from "../../services/User/Login";
import { UserRegister } from "../../services/User/Register";
import { UserAutoLogin } from "../../services/User/Autologin";
import { UserVerifySlug } from "../../services/User/VerifySlug";
import { UserChangePasswordRequest } from "../../services/User/ChangePasswordRequest";
import { UserChangePassword } from "../../services/User/ChangePassword";

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
    const autologin = new UserAutoLogin();
    const response = await autologin.execute(req.body);

    res.status(200).json(response);
  }

  static async VerifySlug(
    req: Request<iVerifySlugParams, {}, {}, {}>,
    res: Response<iVerifySlugSucessResponse | iErrorResponse>
  ) {
    const verify = new UserVerifySlug();
    const response = await verify.execute(req.params);

    res.status(200).json(response);
  }

  static async ChangePasswordRequest(
    req: Request<{}, {}, iChangePasswordRequestBody, {}>,
    res: Response<iChangePasswordRequestSucessResponse | iErrorResponse>
  ) {
    const changePasswordRequest = new UserChangePasswordRequest();
    const response = await changePasswordRequest.execute(req.body);
    
    res.status(200).json(response);
  }

  static async ChangePassword(
    req: Request<{}, {}, iChangePasswordBody, {}>,
    res: Response<iChangePasswordRequestSucessResponse | iErrorResponse>
  ) {
    const changePassword = new UserChangePassword();
    const response = await changePassword.execute(req.body);

    res.status(200).json(response);
  }
}
