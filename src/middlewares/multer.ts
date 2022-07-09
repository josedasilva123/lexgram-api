import Multer from "multer";

export const MulterFileHandler = Multer({
  storage: Multer.diskStorage({
    destination: 'uploads/',
  }), 
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});