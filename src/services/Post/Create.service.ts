import Post from "../../models/post";
import {
  deleteServerFile,
  uploadFile,
} from "../../utils/GoogleDrive/fileupload";
import { iCreateBody } from "../../routes/Post/PostTypes";
import { Image } from "../File/Image.service";

export class PostCreate {
  async execute(body: iCreateBody, file: Express.Multer.File) {
    const { userID, description } = body;

    if (!file) {
      throw new Error("Arquivo enviando inválido.");
    }

    const image = new Image();
    const { path } = await image.optmize(file as Express.Multer.File);

    const compressedFile = {
      ...file,
      path,
    };

    deleteServerFile(file.path);

    const upload = await uploadFile(compressedFile) as any;

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
