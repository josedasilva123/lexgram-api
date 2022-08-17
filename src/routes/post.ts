import { Router } from "express";

import { Authenticate } from "../middlewares/authenticate";
import { Validate } from "../middlewares/handleValidation";

import PostControllers from "../controllers/post";
import { postCreateValidation } from "../middlewares/validations/PostValidations";

const router: Router = Router();

router.post('/', postCreateValidation(),Validate, Authenticate, PostControllers.Create);
router.get('/followers/', Authenticate, PostControllers.GetFollowersPosts);
router.get('/user/:id', Authenticate, PostControllers.GetUserPosts);

export default Router;