import type {} from "./types/express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/db";
import users from "./routes/users";
import posts from "./routes/posts";
import profile from "./routes/profiles";
import auth from "./routes/auth";

dotenv.config();

const app = express();
ConnectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/users", users);
app.use("/profile", profile);
app.use("/auth", auth);
app.use("/posts", posts);

app.listen(process.env.PORT, () => {
  console.log(`Server started at Port : ${process.env.PORT}`);
});
