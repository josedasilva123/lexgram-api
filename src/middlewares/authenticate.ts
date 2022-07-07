import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const Authenticate = (req: Request, res: Response, next: NextFunction) => {
  const {auth} = req.headers;  
  const secretKey = process.env.JWT_SECRET_KEY;

  if(auth && secretKey){
    jwt.verify(String(auth), secretKey, (err, decoded: any) => {
        if(!err){
            req.body.decodedID = decoded.id;
            next();
        } else {
            res.status(400).json({ error: 'Sua token expirou ou é inválida!'})
        }
    })
  }
}