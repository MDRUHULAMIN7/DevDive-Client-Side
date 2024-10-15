import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import UseAuth from "../../../Hooks/UseAuth";
import { useEffect, useRef, useState } from "react";

const VideoRoom = () => {
  const { user } = UseAuth();
  const { roomId } = useParams(); // Get room ID from the URL
  const videoContainerRef = useRef(null); // Ref to hold the video container
  const navigate = useNavigate(); // Hook to navigate
  const [isInMeeting, setIsInMeeting] = useState(false); // State to track if user is in a meeting

  useEffect(() => {
    const initializeMeeting = async () => {
      const appID = parseFloat(import.meta.env.VITE_AppID);
      const serverSecret = import.meta.env.VITE_Server_Secret;
      const displayName = user && user?.displayName ; // Use user name or fallback to 'Guest'
      const time = Date.now().toString();

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        time,
        displayName
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: videoContainerRef.current, // Pass the ref to the video container
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true, // Enable screen sharing button
        onLeaveRoom: () => {
          setIsInMeeting(false); // Set state to false when the user leaves the room
          navigate('/'); // Navigate to home or desired page after leaving
        },
        onJoin: () => {
          setIsInMeeting(true); // Set state to true when the user joins the room
        },
      });
    };

    initializeMeeting().catch((error) =>
      console.error("Error initializing meeting:", error)
    );

    // Clean up when the component unmounts
    return () => {
      // Any necessary cleanup can go here
      setIsInMeeting(false);
    };
  }, [roomId, user, navigate]);

  const handleLeaveCall = () => {
    // This function will automatically be triggered when the user leaves the meeting
    // No need for additional functionality here
  };

  return (
    <section className="w-full h-[90vh]">
      <div ref={videoContainerRef} style={{ width: "100%", height: "100%" }} />
      {/* Show the button only if the user is in a meeting */}
      {isInMeeting && (
        <button
          onClick={handleLeaveCall}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded"
        >
          End Call
        </button>
      )}
    </section>
  );
};

export default VideoRoom;
