import { Request, Response } from "express";

export const EXAMPLE_GET = (req: Request, res: Response) => {
    res.status(200).json({ message: "Teste"});
}