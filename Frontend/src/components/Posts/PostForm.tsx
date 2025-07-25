import { useState } from "react";
import { useCustom } from "../Hooks/useCustom";

const PostForm = () => {
  const [text, setText] = useState<string>("");
  const { Post } = useCustom();

  return (
    <>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            Post.mutate({ text: text });
            setText("");
          }}
        >
          <textarea
            name="text"
            cols={30}
            rows={5}
            placeholder="Create a post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default PostForm;
