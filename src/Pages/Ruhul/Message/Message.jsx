import { useState} from "react";
import UseUser from "../../../Hooks/UseUser";
import ChatArea from "./ChatArea";

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user
 

  const [users] = UseUser(); // Get users from the custom hook

 

 
  const handleUserClick=(user)=>{
    setSelectedUser(user);
    
  }


  return (
    <section className="flex h-full">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4 bg-gray-100 dark:bg-gray-900 overflow-y-auto h-screen">
        <h2 className="font-bold text-lg mb-4">Users</h2>
        {users && users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user)}
            className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
              selectedUser?._id === user._id ? "bg-blue-100" : ""
            }`}
          >
            <img
              src={user.
                photoUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <ChatArea selectedUser={selectedUser}></ChatArea>
    </section>
  );
};

export default Message;
