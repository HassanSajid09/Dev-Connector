import express, { Request, Response } from "express";
import { validate } from "../middlewares/validate";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Auth from "../middlewares/Auth";
import { User } from "../models/Users";
import LoginValidation from "../Validations/LoginSchema";

const router = express.Router();

router.get("/", Auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    res.json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(
  "/",
  validate(LoginValidation),
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ message: "Invalided Credentials" });
        return;
      }

      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        res.status(400).json({ message: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
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
            .json({ message: "User Authorized Successfully", token });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log("Error : ", error);
    }
  }
);

export default router;
