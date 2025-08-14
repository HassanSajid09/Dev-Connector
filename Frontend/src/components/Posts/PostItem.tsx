import { useCustom } from "../Hooks/useCustom";
import { NavLink } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";

type Like = {
  _id: string;
  user: string | { _id: string };
};

type Post = {
  _id: string;
  user: string | { _id: string };
  text: string;
  name: string;
  avatar: string;
  comments: [];
  likes: Like[];
  date: Date;
};

type PostItemProps = {
  post?: Post;
  Actions?: boolean;
  setActions?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostItem: React.FC<PostItemProps> = ({ post, Actions, setActions }) => {
  const { Like, delLike, delPost, authUser } = useCustom();

  if (!post || !post._id) {
    console.log("Post not ready yet");
    return null;
  }
  const { _id, user, text, name, avatar, comments, likes, date } = post;

  const isMyPost =
    !!authUser?.user &&
    String(authUser.user._id) ===
      String(typeof user === "object" ? user._id : user);

  return (
    <>
      <div className="post bg-white p-1 my-1">
        <div>
          <NavLink to={`/profile/${user}`}>
            <img src={avatar} alt="" className="round-img" />
            <h4>{name}</h4>
          </NavLink>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on {FormatDate(date)}</p>
          {Actions && (
            <>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  Like.mutate({ postId: _id });
                }}
              >
                <i className="fas fa-thumbs-up"></i>
                <span>{likes?.length > 0 && <span>{likes?.length}</span>}</span>
              </button>
              <button
                onClick={() => {
                  const userLike = likes.find((like) => {
                    if (typeof like.user === "string") {
                      return like.user === authUser?.user?._id;
                    } else if (
                      typeof like.user === "object" &&
                      like.user !== null
                    ) {
                      return like.user._id === authUser?.user?._id;
                    }
                    return false;
                  });
                  if (userLike) {
                    delLike.mutate({ postId: _id, likeId: userLike._id });
                  } else {
                    console.warn("User hasn't liked this post yet");
                  }
                }}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-down" />
              </button>
              <NavLink
                to={`/posts/${_id}`}
                className={"btn btn-primary"}
                onClick={() => {
                  if (setActions) setActions(true);
                }}
              >
                Discussion
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </NavLink>
              {isMyPost && (
                <button
                  onClick={() => delPost.mutate({ postId: _id })}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostItem;
