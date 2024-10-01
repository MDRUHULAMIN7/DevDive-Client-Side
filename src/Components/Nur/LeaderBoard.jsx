import UseUSer from "../../Hooks/UseUser";
import UseLeaderBoardPosts from "../../Hooks/Nur/UseLeaderBoardPosts";

const LeaderBoard = () => {
  const [users] = UseUSer();
  const [leaderBoardPosts] = UseLeaderBoardPosts();
  console.log(leaderBoardPosts);

  return (
    <div>
      LeaderBoard : Users Count - {users.length} Post :{" "}
      {leaderBoardPosts.length}
    </div>
  );
};

export default LeaderBoard;
