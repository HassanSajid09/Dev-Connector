import { NavLink } from "react-router-dom";
import { useCustom } from "../Hooks/useCustom";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { useState } from "react";

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
          {singlePost?.comments.map((comment) => (
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
