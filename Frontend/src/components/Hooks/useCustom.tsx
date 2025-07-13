import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const token = localStorage.getItem("token");

const getPosts = async () => {
  const res = await axios.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getSinglePost = async (id: string) => {
  const res = await axios.get(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const addLike = async ({ postId }: { postId: string }) => {
  console.log("Token", token);
  const res = await axios.put(
    `/posts/like/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Likes", res.data);
  return res.data;
};

const removeLike = async ({
  postId,
  likeId,
}: {
  postId: string;
  likeId: string;
}) => {
  await axios.delete(`posts/like/${postId}/${likeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Like Removed");
};

const addPost = async ({ text }: { text: string }) => {
  const res = await axios.post(
    "/posts",
    { text: text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

const removePost = async ({ postId }: { postId: string }) => {
  await axios.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Post Deleted!");
};

const addComment = async ({
  postId,
  text,
}: {
  postId: string;
  text: string;
}) => {
  const res = await axios.post(
    `/posts/comment/${postId}`,
    { text: text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

const delComment = async ({
  postId,
  comntId,
}: {
  postId: string;
  comntId: string;
}) => {
  await axios.delete(`/posts/comment/${postId}/${comntId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Post Deleted!");
};

export const useCustom = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile/");

  const { data: Posts, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    enabled: !!token,
  });

  const { data: singlePost } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getSinglePost(id!),
    enabled: !!id,
  });

  const useAuthUser = () => {
    return useQuery({
      queryKey: ["authUser", token],
      queryFn: async () => {
        if (!token) throw new Error("No token available");
        const res = await axios.get("/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      },
      staleTime: 1000 * 60 * 5,
      enabled: !!token,
    });
  };

  const getProfileById = async (id: string) => {
    const res = await axios.get(`/profile/user/${id}`);
    return res.data;
  };

  const { data: profile } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id as string),
    enabled: !!id && isProfilePage,
  });
  const { data: authUser } = useAuthUser();

  const isMyProfile = Boolean(
    authUser?.user?._id &&
      profile?.user?._id &&
      String(authUser.user._id) === String(profile.user._id)
  );

  const Like = useMutation({
    mutationFn: addLike,
    onError: (err) => {
      console.log("Error adding a Like", err);
    },
    onSuccess: () => {
      toast.success("Post Liked!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const delLike = useMutation({
    mutationFn: removeLike,
    onError: (err) => {
      console.log("Error Removing a Like", err);
      toast.error("Error Liking the Post!");
    },
    onSuccess: () => {
      toast.success("Like Removed!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const Post = useMutation({
    mutationFn: addPost,
    onError: (err) => {
      console.log("Error Adding a Post", err);
      toast.error("Error Adding the Post!");
    },
    onSuccess: () => {
      toast.success("post Added!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const delPost = useMutation({
    mutationFn: removePost,
    onError: (err) => {
      console.log("Error Removing a Post", err);
      toast.error("Error Removing the Post!");
    },
    onSuccess: () => {
      toast.success("post Removed!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const Comment = useMutation({
    mutationFn: addComment,
    onError: (err) => {
      console.log("Error Adding a Comment", err);
      toast.error("Error Adding the Comment!");
    },
    onSuccess: () => {
      toast.success("Comment Added!");
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const removeComment = useMutation({
    mutationFn: delComment,
    onError: (err) => {
      console.log("Error Removing a Comment", err);
      toast.error("Error Removing the Comment!");
    },
    onSuccess: () => {
      toast.success("Comment Removed!");
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
  return {
    Posts,
    isPending,
    Like,
    delLike,
    delPost,
    profile,
    isMyProfile,
    authUser,
    Post,
    singlePost,
    Comment,
    removeComment,
  };
};
