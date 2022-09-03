import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type tJwtVerify = (
  req: Request,
  res: Response,
  next: NextFunction,
  token: string | string[],
  secretKey: string
) => void;

const JwtVerify: tJwtVerify = (req, res, next, token, secretKey) => {
  jwt.verify(String(token), secretKey, (err, decoded: any) => {
    if (!err) {
      req.body.decodedID = decoded.id;
      next();
    } else {
      res.status(400).json({ error: "Sua token expirou ou é inválida!" });
      return false;
    }
  });
};

export const Authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { auth } = req.headers;
  const secretKey = process.env.JWT_SECRET_KEY;

  if (auth && secretKey) {
    JwtVerify(req, res, next, auth, secretKey);
  }
};

export const AuthenticatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { auth } = req.headers;
  const secretKey = process.env.JWT_SECRET_RECOVER;

  if (auth && secretKey) {
    JwtVerify(req, res, next, auth, secretKey);
  }
};