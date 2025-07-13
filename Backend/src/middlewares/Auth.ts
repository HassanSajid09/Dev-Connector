import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const Auth = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.header("Authorization");
  const token = bearerHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "User not Authorized" });
    return;
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.jwtSecret as string
    ) as JwtPayload;
    req.user = decodedToken.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "User Not Authorized" });
  }
};

export default Auth;
