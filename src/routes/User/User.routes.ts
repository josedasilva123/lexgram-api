import { Router } from "express";
import { Authenticate, AuthenticatePassword } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import {
  userChangePasswordRequestValidation,
  userChangePasswordValidation,
  userLoginValidation,
  userRegisterValidation,
} from "./UserValidations";
import UserControllers from "./UserControllers";

const router: Router = Router();

router.post("/", userRegisterValidation(), Validate, HandleErrors(UserControllers.Register));
router.post("/login", userLoginValidation(), Validate, HandleErrors(UserControllers.Login));
router.get("/autologin", Authenticate, HandleErrors(UserControllers.AutoLogin));
router.get("/verify/:slug", HandleErrors(UserControllers.VerifySlug));
router.post("/password/", userChangePasswordRequestValidation(), Validate, HandleErrors(UserControllers.ChangePasswordRequest));
router.patch("/password/", userChangePasswordValidation(), Validate, AuthenticatePassword,HandleErrors(UserControllers.ChangePassword));

export default router;
