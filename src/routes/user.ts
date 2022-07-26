import { Router } from "express";
import UserControllers from "../controllers/user";
import { Authenticate } from "../middlewares/authenticate";

const router: Router = Router();

router.post('/', UserControllers.Register);
router.post('/login', UserControllers.Login);
router.post('/autologin', Authenticate, UserControllers.AutoLogin);

export default router;