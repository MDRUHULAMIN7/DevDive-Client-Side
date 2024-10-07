/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import UsePosts from "../../Hooks/UsePosts";
import UseAuth from "../../Hooks/UseAuth";
import UseLikes from "../../Hooks/UseLikes";
import UseComments from "../../Hooks/UseComments";
import UseDisLikes from "../../Hooks/UseDisLike";

export default function LikeDislikeFilter  ({ setPosts }) {
  const { user } = UseAuth(); // Get the current user
  const [posts] = UsePosts();
  const [likes] = UseLikes(); // Get the list of likes for the current user
  const [disLikes] = UseDisLikes(); // Get the list of dislikes for the current user
  const [comments] = UseComments(); 
  const [sortOption, setSortOption] = useState("");

  console.log(comments);


  useEffect(() => {
    // let sortedPosts = posts;
    let filteredPosts = posts;

    // if (sortOption === "my-liked-posts") {
    //   // Filter posts to show only those the user has liked
    //   const likedPostIds = likes?.map(like => like.postId); // Get the IDs of the liked posts
    //   sortedPosts = posts.filter(post => likedPostIds.includes(post._id)); // Filter posts by liked post IDs
    // }  else if (sortOption === "most-liked") {
    //   sortedPosts = [...posts].sort((a, b) => b.likes - a.likes); // Sort by likes in descending order
    // } else if (sortOption === "most-disliked") {
    //   // Sort posts by the most disliked
    //   sortedPosts = [...posts].sort((a, b) => b.dislikes - a.dislikes);
    // }

    // Filter for "My Liked Posts"
    if (sortOption === "my-liked-posts") {
      const likedPostIds = likes
        .filter(like => like?.email === user?.email) // Only include posts liked by the signed-in user
        // .sort((a, b) =>new Date(b.likeTime) - new Date(a.likeTime)) // Sort by `likeTime` in descending order
        .map(like => like.postId); // Extract post IDs that the user has liked

      // Filter posts based on liked post IDs
      filteredPosts = posts.filter(post => likedPostIds.includes(post._id));
      console.log(filteredPosts);
    } 
     // Sort for "Most Disliked" option
     else if (sortOption === "my-disliked-posts") {
      // filteredPosts = [...posts].sort((a, b) => b.dislikes - a.dislikes);
      const disLikedPostIds = disLikes
        .filter(like => like?.email === user?.email) // Only include posts liked by the signed-in user
        .map(like => like.postId); // Extract post IDs that the user has liked

      // Filter posts based on liked post IDs
      filteredPosts = posts.filter(post => disLikedPostIds.includes(post._id));
      console.log(filteredPosts);
    }

     // Update the parent component's state to show filtered/sorted posts
     setPosts(filteredPosts);
    }, [sortOption, posts, setPosts]);

    // Updating the parent component's state
  //   setPosts(sortedPosts);
  // }, [sortOption, posts, likes, setPosts]);

  const handleChange = (event) => {
    setSortOption(event.target.value); // Update sort option based on user selection
  };

  return (
    <div>
      <select
        className="w-32 p-1 border dark:border-themeColor3 rounded-md outline-none bg-white text-black dark:bg-themeColor dark:text-white"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled selected>
          Filter
        </option>
        <option value="my-liked-posts">My Liked Posts</option>
        <option value="my-disliked-posts">My Disliked Posts</option>
        {/* <option value="most-liked">Most Liked</option> */}
      </select>

      <div className="">
        {/* {posts.map((post) => (
          <div key={post._id} className="flex gap-4">
            <p>Like: {post.likes}</p>
            <p>Dislike: {post.dislikes}</p>
          </div>
          
        ))} */}
      </div>
    </div>
  );
}
