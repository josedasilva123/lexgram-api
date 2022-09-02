import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../../middlewares/validations/UserValidations";
import UserControllers from "./UserControllers";

const router: Router = Router();

router.post("/", userRegisterValidation(), Validate, HandleErrors(UserControllers.Register));
router.post("/login", userLoginValidation(), Validate, HandleErrors(UserControllers.Login));
router.post("/autologin", Authenticate, HandleErrors(UserControllers.AutoLogin));
router.get("/verify/:slug", HandleErrors(UserControllers.AutoLogin));

export default router;
