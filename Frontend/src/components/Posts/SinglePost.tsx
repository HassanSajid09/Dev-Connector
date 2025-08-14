import { NavLink } from "react-router-dom";
import { useCustom } from "../Hooks/useCustom";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { useState } from "react";

interface Comment {
  _id: string;
  text: string;
  name: string;
  avatar: string;
  user: string;
  date: Date; // or Date if you handle it as a Date object
}

const SinglePost = () => {
  const [, setActions] = useState<boolean>(false);
  const { singlePost } = useCustom();
  return (
    <>
      <section className="container">
        <NavLink to="/posts" className="btn">
          Back To Posts
        </NavLink>
        <PostItem post={singlePost} Actions={false} setActions={setActions} />
        <CommentForm postId={singlePost?._id} />
        <div className="comments">
          {singlePost?.comments.map((comment: Comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={singlePost?._id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default SinglePost;
