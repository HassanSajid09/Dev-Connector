import express, { Request, Response } from "express";
import Auth from "../middlewares/Auth";
import { validate } from "../middlewares/validate";
import PostValidation from "../Validations/PostSchema";
import { User } from "../models/Users";
import { Post } from "../models/Posts";
import comntValidation from "../Validations/CommentSchema";

const router = express.Router();

router.post(
  "/",
  Auth,
  validate(PostValidation),
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById((req.user as { id: string }).id).select(
        "-password"
      );

      const newPost = {
        text: req.body.text,
        name: user?.name,
        avatar: user?.avatar,
        user: (req.user as { id: string }).id,
      };

      const post = new Post(newPost);
      await post.save();

      res.status(201).json(post);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/", Auth, async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", Auth, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "Post Not Found!" });
      return;
    }
    res.status(200).json(post);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", Auth, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post?.user?.toString() !== (req.user as { id: string }).id) {
      res.status(401).json({ message: "User not Authorized" });
    }
    if (!post) {
      res.status(404).json({ message: "Post Not Found!" });
      return;
    }

    await post?.deleteOne();

    res.json(post);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/like/:id", Auth, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post &&
      post.likes &&
      req.user &&
      post.likes.filter(
        (like) => like.user?.toString() === (req.user as { id: string }).id
      ).length > 0
    ) {
      res.status(400).json({ message: "Post Already Liked" });
      return;
    }

    post?.likes.unshift({ user: (req.user as { id: string }).id });

    await post?.save();

    res.status(200).json(post?.likes);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete(
  "/like/:id/:like_id",
  Auth,
  async (req: Request, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);

      if (
        post &&
        post.likes &&
        req.user &&
        post.likes.filter(
          (like) => like.user?.toString() === (req.user as { id: string }).id
        ).length === 0
      ) {
        res.status(400).json({ message: "Post has not yet been liked!" });
        return;
      }

      const removeIndex = post?.likes
        .map((like) => like.user?.toString())
        .indexOf((req.user as { id: string }).id);
      if (typeof removeIndex === "number") {
        post?.likes.splice(removeIndex, 1);
      }

      await post?.save();
      res.status(200).json(post?.likes);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/comment/:id",
  Auth,
  validate(comntValidation),
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById((req.user as { id: string }).id).select(
        "-password"
      );
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user?.name,
        avatar: user?.avatar,
        user: (req.user as { id: string }).id,
      };

      post?.comments.unshift(newComment);
      await post?.save();

      res.status(200).json(post?.comments);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.delete(
  "/comment/:id/:comment_id",
  Auth,
  async (req: Request, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);

      const comment = post?.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      if (!comment) {
        res.status(404).json({ message: "Comment not Found!" });
        return;
      }

      const removeIndex = post?.comments
        .map((comment) => comment.user?.toString())
        .indexOf((req.user as { id: string }).id);
      if (typeof removeIndex === "number") {
        post?.comments.splice(removeIndex, 1);
      }

      await post?.save();
      res.status(200).json(post?.comments);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
