/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import UsePosts from "../../Hooks/UsePosts";

export default function LikeDislikeFilter({ setPosts }) {
  const [posts] = UsePosts();
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    let sortedPosts = posts;

    if (sortOption === "most-liked") {
      sortedPosts = [...posts].sort((a, b) => b.likes - a.likes); // Sort by likes in descending order
    } else if (sortOption === "most-disliked") {
      sortedPosts = [...posts].sort((a, b) => b.dislikes - a.dislikes); // Sort by dislikes in descending order
    }

    // Updating the parent component's state
    setPosts(sortedPosts);
  }, [sortOption, posts, setPosts]);

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
        <option value="most-liked">Most Liked</option>
        <option value="most-disliked">Most Disliked</option>
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
