/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import UsePosts from "../../Hooks/UsePosts";
import UseAuth from "../../Hooks/UseAuth";
import UseLikes from "../../Hooks/UseLikes";
import UseDisLikes from "../../Hooks/UseDisLike";
import UseAllComments from "../../Hooks/adnan/UseAllComments";

export default function LikeDislikeFilter  ({ setPosts }) {
  const { user } = UseAuth(); 
  const [posts, refetch] = UsePosts();
  const [likes] = UseLikes();
  const [disLikes] = UseDisLikes(); 
  const [comments] = UseAllComments(); 
  const [sortOption, setSortOption] = useState("");


  useEffect(() => {

    let filteredPosts = posts;

    if (sortOption === "my-liked-posts") {
      const likedPostIds = likes
        .filter(like => like?.email === user?.email)
        .map(like => like.postId); 


      filteredPosts = posts.filter(post => likedPostIds.includes(post._id));
      console.log(filteredPosts);
    } 

     else if (sortOption === "my-commented-posts") {
      const CommentedPostIds = comments
        .filter(comment => comment?.userName === user?.displayName) 
        .map(comment => comment.contentId);

      filteredPosts = posts.filter(post => CommentedPostIds.includes(post._id));
      console.log(filteredPosts);
    }

     setPosts(filteredPosts);
    }, [sortOption, posts, setPosts]);


  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <select
        className="w-36 p-1 border dark:border-themeColor3 rounded-md outline-none bg-white text-black dark:bg-themeColor dark:text-white"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled selected>
          Filter
        </option>
        <option value="all-posts">All</option>
        <option value="my-liked-posts">Liked Posts</option>
        <option value="my-commented-posts">Commented Posts</option>
      </select>
    </div>
  );
}
