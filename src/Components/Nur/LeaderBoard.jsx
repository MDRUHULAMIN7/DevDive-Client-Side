import UseUSer from "../../Hooks/UseUser";

const LeaderBoard = () => {
  const [users] = UseUSer();
  console.log(users);

  return <div>LeaderBoard : Users Count - {users.length}</div>;
};

export default LeaderBoard;
