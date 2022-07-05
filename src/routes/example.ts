import { Router } from "express";
import { EXAMPLE_GET } from "../controllers/example";

const router: Router = Router();

router.get('/', EXAMPLE_GET);

export default router;