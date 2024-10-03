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
        className="w-32 border-2 p-1 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
        style={{ borderColor: "#54ACDD" }}
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled selected>
          Filter
        </option>
        <option value="most-liked">Most Liked</option>
        <option value="most-disliked">Most Disliked</option>
      </select>

      <div className="mt-5">
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
