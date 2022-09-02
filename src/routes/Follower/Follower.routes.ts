import { Router } from "express";

import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import { followValidation } from "./FollowerValidations";

import FollowerControllers from "./FollowerControllers";

const router: Router = Router();

router.put('/follow', Authenticate, followValidation(), Validate, HandleErrors(FollowerControllers.Follow));
router.put('/unfollow', Authenticate, followValidation(), Validate,  HandleErrors(FollowerControllers.Unfollow));

export default router;