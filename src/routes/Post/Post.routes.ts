import { Router } from "express";

import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import { postCreateValidation } from "../../middlewares/validations/PostValidations";

import PostControllers from "./PostControllers";

const router: Router = Router();

router.post('/', postCreateValidation(), Validate, Authenticate, HandleErrors(PostControllers.Create));
router.get('/followers/', Authenticate, HandleErrors(PostControllers.GetFollowersPosts));
router.get('/user/:id', Authenticate, HandleErrors(PostControllers.GetUserPosts));

export default router;