import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import UseAuth from "../../../Hooks/UseAuth";
import { useEffect, useRef, useState, useCallback } from "react";

const VideoRoom = () => {
  const { user } = UseAuth();
  const { roomId } = useParams(); 
  const videoContainerRef = useRef(null); 
  const navigate = useNavigate(); 
  const [isInMeeting, setIsInMeeting] = useState(false); 


  const handleJoinCall = useCallback(() => {
    console.log("Joining call...");
    setIsInMeeting(true); 
  }, []);

  const handleLeaveCall = useCallback(() => {
    console.log("Leaving the call..."); 
    setIsInMeeting(false); 
    navigate("/"); 
  }, [navigate]);

  useEffect(() => {
    const initializeMeeting = async () => {
      try {
        const appID = parseFloat(import.meta.env.VITE_AppID);
        const serverSecret = import.meta.env.VITE_Server_Secret;
        const displayName = user?.displayName || "Guest";
        const time = Date.now().toString();

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          time,
          displayName
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);

   
        setTimeout(() => {
          zc.joinRoom({
            container: videoContainerRef.current, 
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true, 
            onLeaveRoom: () => {
              console.log("User left the room.");
              handleLeaveCall(); 
            },
            onJoin: () => {
              console.log("User joined the room.");
              handleJoinCall();
            },
          });
        }, 500); 
      } catch (error) {
        console.error("Error initializing meeting:", error);
      }
    };

    initializeMeeting();

    
    return () => {
      setIsInMeeting(false); 
    };
  }, [roomId, user, handleJoinCall, handleLeaveCall]);

  return (
    <section className="w-full h-[90vh]">
      <div
        ref={videoContainerRef}
        className="w-full h-full" 
      />
      {isInMeeting && (
        <button
          onClick={handleLeaveCall}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                     bg-red-500 text-white py-2 px-4 rounded shadow-lg"
        >
          End Call
        </button>
      )}
    </section>
  );
};

export default VideoRoom;
