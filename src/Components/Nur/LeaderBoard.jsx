import { useState } from "react";
import UseLeaderBoardPosts from "../../Hooks/Nur/UseLeaderBoardPosts";
import UseLeaderBoardLikes from "../../Hooks/Nur/UseLeaderBoardLikes";
import UseLeaderBoardComments from "../../Hooks/Nur/UseLeaderBoardComments";
import { useNavigate } from "react-router-dom";

const LeaderBoard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Post");
  const [loadAllPosts, setLoadAllPosts] = useState(false);
  const [loadAllLikes, setLoadAllLikes] = useState(false);

  const [leaderBoardPosts] = UseLeaderBoardPosts(loadAllPosts);
  const [LeaderBoardLikes] = UseLeaderBoardLikes(loadAllLikes);
  const [leaderBoardComments] = UseLeaderBoardComments();

  const tabs = ["Post", "Like", "Comments"];

  const handleLoadAllPosts = (loadAllPosts) => {
    setLoadAllPosts(!loadAllPosts);
  };

  const handleLoadAllLikes = (loadAllLikes) => {
    setLoadAllLikes(!loadAllLikes);
  };

  return (
    <div className="md:p-4 p-1 w-full mx-auto items-center">
      {/* Tab Header */}
      <div className="flex justify-start items-center mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg ml-4 mt-2
              ${
                activeTab === tab
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full flex  justify-center">
        <div className=" bg-transparent p-2 md:p-6 rounded-lg md:m-4 md:pb-4 w-[768px]">
          {activeTab === "Post" && (
            <div>
              <div className="bg-gray-50 shadow rounded-lg dark:bg-themeColor2 border-2 dark:border-gray-500">
                <div className="card-header px-4 py-2 border-b border-gray-500 text-lg dark:text-gray-200">
                  <strong>Popular Posts</strong>
                </div>
                <p className="m-3 card-text text-gray-700 dark:text-slate-100">
                  Posts with the highest number of likes.
                </p>
                <ol className="list-group list-group-flush list-group-numbered pl-0 pr-1 md:pr-4">
                  {leaderBoardPosts.map((post, index) => (
                    <div
                      onClick={() => navigate(`/post-details/${post._id}`)}
                      key={index}
                      className="d-flex justify-between items-center list-group-item list-group-item-action px-1 md:px-4 py-2 border-b w-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none border-gray-300 dark:border-gray-600 hover:cursor-pointer">
                      <div className=" ml-2 mr-auto flex gap-2">
                        <span className="font-bold">{index + 1}.</span>
                        <p className="flex-grow">{post.title}</p>
                        <p className="font-medium">{post.likes}</p>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-between items-center list-group-item px-4 py-2">
                    <span>&nbsp;</span>
                    <a
                      onClick={() => handleLoadAllPosts(loadAllPosts)}
                      className="link-primary text-white inline-block px-3 py-1 text-sm rounded-lg bg-blue-500"
                      href="#">
                      {loadAllPosts ? "Show Top 5" : "Show All"}
                    </a>
                  </div>
                </ol>
              </div>
            </div>
          )}
          {activeTab === "Like" && (
            <div>
              <div className="bg-gray-50 border-2  dark:border-gray-500 shadow rounded-lg dark:bg-themeColor2">
                <div className="card-header px-4 py-2 border-b border-gray-500 text-lg dark:text-gray-200">
                  <strong>Top Liker</strong>
                </div>
                <p className="m-3 card-text text-gray-700 dark:text-slate-100">
                  Users who have given the highest number of likes.
                </p>
                <ol className="list-group list-group-flush list-group-numbered pl-0 pr-1 md:pr-4">
                  {LeaderBoardLikes[0]?.map((user, index) => (
                    <div
                      onClick={() => navigate(`/users/${user._id}/profile`)}
                      key={index}
                      className="d-flex justify-between items-center list-group-item list-group-item-action px-1 md:px-4 py-2 border-b w-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none border-gray-300 dark:border-gray-600 hover:cursor-pointer">
                      <div className=" ml-2 mr-auto flex gap-2">
                        <span className="font-bold">{index + 1}.</span>
                        <p className="flex-grow">{user.name}</p>
                        <p className="font-medium">{user.count}</p>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-between items-center list-group-item px-4 py-2">
                    <span>&nbsp;</span>
                    <a
                      onClick={() => handleLoadAllLikes(loadAllLikes)}
                      className="link-primary text-white inline-block px-3 py-1 text-sm rounded-lg bg-blue-500"
                      href="#">
                      {loadAllLikes ? "Show Top 5" : "Show All"}
                    </a>
                  </div>
                </ol>
              </div>
            </div>
          )}
          {activeTab === "Comments" && (
            <div>
              <div className="bg-gray-50 border-2  dark:border-gray-500 shadow rounded-lg dark:bg-themeColor2">
                <div className="card-header px-4 py-2 border-b border-gray-500 text-lg dark:text-gray-200">
                  <strong>Top Commenter</strong>
                </div>
                <p className="m-3 card-text text-gray-700 dark:text-slate-100">
                  Users who have made the highest number of comments.
                </p>
                <ol className="list-group list-group-flush list-group-numbered pl-0 pr-1 md:pr-4">
                  {leaderBoardComments.map(
                    (user, index) => (
                      console.log("user",user),
                      (
                        <div
                          onClick={() => navigate(`/users/${user.userEmail}/profile`)}
                          key={index}
                          className="d-flex justify-between items-center list-group-item list-group-item-action px-1 md:px-4 py-2 border-b w-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none border-gray-300 dark:border-gray-600">
                          <div className=" ml-2 mr-auto flex gap-2">
                            <span className="font-bold">{index + 1}.</span>
                            <p className="flex-grow">{user._id}</p>
                            <p className="font-medium">{user.count}</p>
                          </div>
                        </div>
                      )
                    )
                  )}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
