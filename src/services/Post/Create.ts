import Post from "../../models/post";
import sharp from "sharp";
import {
  deleteServerFile,
  uploadFile,
} from "../../functions/GoogleDrive/fileupload";
import { iCreateBody } from "../../routes/Post/PostTypes";

export class PostCreate {
  async execute(body: iCreateBody, file: Express.Multer.File) {
    const { userID, description } = body;

    if (!file) {
      throw new Error("Arquivo enviando inválido.");
    }

    await sharp(file.path)
      .resize({
        fit: sharp.fit.contain,
        width: 1000,
      })
      .webp({ quality: 50 })
      .toFile(`uploads/webp/${file.filename}`);

    const compressedFile = {
      ...file,
      path: "uploads\\webp\\" + file.filename,
    };

    deleteServerFile(file.path);

    const upload: any = await uploadFile(compressedFile);

    deleteServerFile(compressedFile.path);

    if (!upload) {
      throw new Error("Desculpe! Não foi possível realizar o upload!");
    }

    const newPost = {
      userID,
      image: upload.data.image,
      description,
    };

    const response = await Post.create(newPost);

    return { message: "Post criado com sucesso!", post: response };
  }
}
