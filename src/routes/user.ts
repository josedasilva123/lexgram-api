import { Router } from "express";
import { USER_AUTOLOGIN, USER_LOGIN, USER_REGISTER } from "../controllers/user";

const router: Router = Router();

router.post('/', USER_REGISTER);
router.post('/login', USER_LOGIN);
router.post('/autologin', USER_AUTOLOGIN);

export default router;