import { Router } from "express";

import { Authenticate } from "../middlewares/authenticate";
import { MulterFileHandler } from "../middlewares/multer";

const router: Router = Router();