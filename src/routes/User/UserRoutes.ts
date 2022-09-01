import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { Validate } from "../../middlewares/handleValidation";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../../middlewares/validations/UserValidations";
import UserControllers from "./UserControllers";

const router: Router = Router();

router.post("/", userRegisterValidation(), Validate, UserControllers.Register);
router.post("/login", userLoginValidation(), Validate, UserControllers.Login);
router.post("/autologin", Authenticate, UserControllers.AutoLogin);
router.get("/verify/:slug", UserControllers.AutoLogin);

export default router;
