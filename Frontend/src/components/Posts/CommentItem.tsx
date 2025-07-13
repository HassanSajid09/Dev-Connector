import { useEffect } from "react";
import FormatDate from "../../utils/FormatDate";
import { useCustom } from "../Hooks/useCustom";
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const { authUser, removeComment } = useCustom();

  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (!authUser && !localStorage.getItem("token")) {
  //     queryClient.clear();
  //   }
  // }, [authUser, queryClient]);

  const isMyPost =
    !!authUser?.user &&
    String(authUser.user._id) ===
      String(typeof user === "object" ? user._id : user);

  return (
    <>
      <div className="post bg-white p-1 my-1">
        <div>
          <NavLink to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </NavLink>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on {FormatDate(date)}</p>
          {isMyPost && (
            <button
              onClick={() =>
                removeComment.mutate({ postId: postId, comntId: _id })
              }
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentItem;
