import { Router } from "express";
import { Validate } from "../middlewares/handleValidation";

const router: Router = Router();

router.post('/', Validate);

export default Router;