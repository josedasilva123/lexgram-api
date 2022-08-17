import { Router } from "express";
import FollowerControllers from "../controllers/follower";
import { Validate } from "../middlewares/handleValidation";

const router: Router = Router();

router.put('/follow', FollowerControllers.Follow);
router.put('/unfollow', FollowerControllers.Unfollow);

export default Router;