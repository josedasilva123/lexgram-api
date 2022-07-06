import { Router } from "express";
import { USER_REGISTER } from "../controllers/user";

const router: Router = Router();

router.post('/', USER_REGISTER);

export default router;