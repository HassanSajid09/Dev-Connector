import express, { Request, Response } from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validate } from "../middlewares/validate";
import RegisterValidation from "../Validations/RegisterSchema";
import { User } from "../models/Users";

dotenv.config();

const router = express.Router();

router.post(
  "/",
  validate(RegisterValidation),
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ message: "User Already Exists" });
        return;
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = new User({ name, email, password, avatar });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      const payload = {
        user: {
          id: newUser.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret as string,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
          }

          res
            .status(200)
            .json({ message: "User Registered Successfully", token });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log("Error : ", error);
    }
  }
);

export default router;
