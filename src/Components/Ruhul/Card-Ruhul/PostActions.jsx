import LikeButton from "./LikeButton";
import DisLikeButton from "./DisLikeButton";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import UseLikes from "../../../Hooks/UseLikes";
import UseDisLikes from "../../../Hooks/UseDisLike";
import { toast } from "react-toastify";
import UsePosts from "../../../Hooks/UsePosts";
import { useCallback, useState } from "react";

export default function PostActions({ data, user, setReLoad, reLoad }) {
  const [likes, isLoading, likeRef] = UseLikes();
  const [dislikes, , dislikeRef] = UseDisLikes();
  const [, , refetch] = UsePosts();
  const axiosPublic = useAxiosPublic();
  const [isUpdating, setIsUpdating] = useState(false);
  const [like, setLike] = useState(data?.likes);
  const [disLike, setDisLike] = useState(data?.dislikes);

  const handleAction = useCallback(
    async (type, postId) => {
      if (!user) {
        toast.error(`You need to log in to ${type} a post.`);
        return;
      }
      if (isUpdating) return; // Prevent multiple clicks during update

      setIsUpdating(true);
      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      try {
        const url = `/${type}/${postId}`;
        const res = await axiosPublic.post(url, { newUser });

        if (res?.status === 200) {
          await Promise.all([refetch(), setReLoad(!reLoad), likeRef(), dislikeRef()]); // Parallel refetch
        }
      } catch (err) {
        console.error(`Error during ${type}:`, err);
        toast.error(`An error occurred while ${type}ing the post.`);
      } finally {
        setIsUpdating(false); // Reset update state
      }
    },
    [user, axiosPublic, refetch, likeRef, dislikeRef, isUpdating, setReLoad, reLoad]
  );

  const isDisliked = dislikes.some(
    (dislike) => dislike.postId === data._id && dislike.email === user?.email
  );
  const isLiked = likes.some(
    (like) => like.postId === data._id && like.email === user?.email
  );

  return (
    <div className="flex space-x-4">
      <LikeButton
        like={like}
        setLike={setLike}
        disLike={disLike}
        setDisLike={setDisLike}
        reLoad={reLoad}
        setReLoad={setReLoad}
        isLiked={isLiked}
        data={data}
        isLoading={isLoading}
        handleLike={() => handleAction("like", data._id)}
      />
      <DisLikeButton
        like={like}
        setLike={setLike}
        disLike={disLike}
        setDisLike={setDisLike}
        reLoad={reLoad}
        setReLoad={setReLoad}
        isDisliked={isDisliked}
        isLiked={isLiked}
        data={data}
        isLoading={isLoading}
        handleDislike={() => handleAction("dislike", data._id)}
      />
    </div>
  );
}
