import { Router } from "express";

import { Authenticate } from "../middlewares/authenticate";

import UserControllers from "../controllers/user";

const router: Router = Router();

router.post('/', UserControllers.Register);
router.post('/login', UserControllers.Login);
router.post('/autologin', Authenticate, UserControllers.AutoLogin);

export default router;