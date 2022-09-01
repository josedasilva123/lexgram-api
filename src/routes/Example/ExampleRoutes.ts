import { Router } from "express";
import { EXAMPLE_GET, EXAMPLE_GETFILE, EXAMPLE_UPLOAD } from "./ExampleControllers";
import { MulterFileHandler } from "../../middlewares/multer";

const router: Router = Router();

router.get('/', EXAMPLE_GET);
router.post('/upload', MulterFileHandler.single('file'), EXAMPLE_UPLOAD);
router.get('/upload/:fileId', EXAMPLE_GETFILE);

export default router;