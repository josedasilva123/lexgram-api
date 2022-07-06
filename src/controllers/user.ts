import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from '../models/user';

export const USER_REGISTER = async (req: Request, res: Response) => {
    try {
        const {name, email, password, slug} = req.body;
        
        if(!name || !email || !password || !slug){
            throw new Error("Parece que algum parâmetro obrigatório do body está faltando.")
        }

        const existingEmail = await User.findOne({email: email});
        const existingSlug = await User.findOne({email: email});

        if(existingEmail){
            throw new Error("O e-mail fornecido já pertece a um usuário cadastrado.");   
        }

        if(existingSlug){
            throw new Error("O slug já pertence a usuário cadastrado.");   
        }

        const currentDate = new Date();

        const newUser = {
            name, 
            email,
            password: bcrypt.hashSync(password, 1), 
            slug,
            createdAt: currentDate,
            updatedAt: currentDate,
        }
        
        await User.create(newUser);
        res.status(200).json({ message: "Cadastrado realizado com sucesso!"});
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}