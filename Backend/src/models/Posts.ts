import mongoose, { Document, Model } from "mongoose";

interface Post extends Document {
  user: mongoose.Schema.Types.ObjectId;
  text: String;
  name: String;
  avatar: String;
  likes: {
    user: mongoose.Schema.Types.ObjectId;
  }[];
  comments: {
    user: mongoose.Schema.Types.ObjectId;
    text: String;
    name: String;
    avatar: String;
    date: Date;
  }[];
  date: Date;
}

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("Post", PostSchema);
