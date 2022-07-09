import { Request, Response } from "express";
import { deleteServerFile, getFile, uploadFile } from "../functions/googledrive/fileupload";
import sharp from "sharp";

export const EXAMPLE_GET = (req: Request, res: Response) => {
    res.status(200).json({ message: "Teste"});
}

export const EXAMPLE_UPLOAD = async (req: Request, res: Response) => {
    try {
        const file = req.file;

        if(file){
            await sharp(file.path)
            .resize({
                fit: sharp.fit.contain,
                width: 1000,
            })
            .webp({ quality: 50 })
            .toFile(`uploads/webp/${file.filename}`);
            
            const compressedFile = { ...file, path: 'uploads\\webp\\' + file.filename}

            deleteServerFile(file.path);

            const upload = await uploadFile(compressedFile);

            deleteServerFile(compressedFile.path);

            if(!upload){
                throw new Error("Desculpe! Não foi possível realizar o upload!");            
            }

            res.status(200).json({message: 'Arquivo criado com sucesso!', data: upload})
        } 
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

export const EXAMPLE_GETFILE = async (req: Request, res: Response) => {
    try {
        const { fileId } = req.params;

        if(!fileId){
            throw new Error("É necessário o envio do fileId.");
        }
        const file = await getFile(fileId);

        if(!file){
            throw new Error("Arquivo inválido."); 
        }

        res.status(200).json({ file })

    } catch (error: any) {
        res.status(400).json({ error: error.message})
    }
}