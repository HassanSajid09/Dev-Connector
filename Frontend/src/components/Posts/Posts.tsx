import { useEffect, useState } from "react";
import { useCustom } from "../Hooks/useCustom";
import PostForm from "./PostForm";
import PostItem from "./PostItem";
import NavBar from "../Layout/NavBar";
import { useQueryClient } from "@tanstack/react-query";

const Posts = () => {
  const [actions, setActions] = useState<boolean>(true);
  const { Posts, isPending } = useCustom();
  useEffect(() => {
    const shouldReload = localStorage.getItem("reloadPostsPageOnce");

    if (shouldReload) {
      localStorage.removeItem("reloadPostsPageOnce");
      window.location.reload();
    }
  }, []);

  return (
    <>
      <NavBar />
      {isPending && <p>Loading Posts...</p>}
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome to the community
        </p>
        <PostForm />
        <div className="posts">
          {Posts?.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              Actions={actions}
              setActions={setActions}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Posts;
