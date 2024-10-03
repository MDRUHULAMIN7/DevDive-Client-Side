import UseLeaderBoardPosts from "../../Hooks/Nur/UseLeaderBoardPosts";

const LeaderBoard = () => {
  const [leaderBoardPosts] = UseLeaderBoardPosts();
  console.log(leaderBoardPosts);

  return (
    <div>
      <div className="m-4 grid grid-cols-6 gap-4">
        <div className="pb-4 col-span-6 md:col-span-3 lg:col-span-2 ">
          <div className="card bg-white shadow rounded-lg dark:bg-themeColor2">
            <div className="card-header px-4 py-2 border-b border-gray-500">
              <strong>Popular Karma</strong>
            </div>
            <p className="m-3 card-text text-gray-700 dark:text-slate-100">
              Users with highest Liked in Post karma.
            </p>
            <ol className="list-group list-group-flush list-group-numbered pr-4">
              {leaderBoardPosts.map(
                (post, index) => (
                  console.log(post),
                  (
                    <div
                      key={index}
                      className="d-flex justify-between items-center list-group-item list-group-item-action px-4 py-2 border-b w-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none border-gray-300">
                      <div className=" ml-2 mr-auto flex gap-2">
                        <span className="font-bold">{index + 1}.</span>
                        <p className="flex-grow">{post.title}</p>
                        <p>{post.likes}</p>
                      </div>
                    </div>
                  )
                )
              )}
              <div className="d-flex justify-between items-center list-group-item px-4 py-2">
                <span>&nbsp;</span>
                <a className="link-primary text-blue-500" href="#">
                  Next
                </a>
              </div>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
