import { Handler, NextFunction, Request, Response } from "express";

export function HandleErrors(middleware: Handler) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await middleware(req, res, next);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message })
        }
    }
}