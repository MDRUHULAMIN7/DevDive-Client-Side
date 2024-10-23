import { useState } from "react";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import useNotifications from "../../Hooks/useNotifications";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import NotificationCard from "./NotificationCard";
import moment from "moment";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import basicUser from "../../../public/BasicUser.jpg"

const NotificationBtn = () => {
    const {user}= UseAuth()
  const notificationBtn = <IoNotificationsOutline className="text-[22px] " />;
  const navigate= useNavigate()
  const [showNotificationModal, setshowNotificationModal] = useState(false);
  const [notifications, isLoading, notificationRefetch] = useNotifications();
  console.log(notifications.length);
  const handleNotificationDelete = async (id) => {
    try {
      const response = await axiosPublic.delete(`/deleteNotification/${id}`);
      console.log(response.data);
      notificationRefetch();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteAllNotifications=async()=>{
    try {
        const response = await axiosPublic.delete(`/deleteAllNotification/${user.email}`);
        console.log(response.data);
        notificationRefetch();
      } catch (error) {
        console.error(error);
      }
  }
  return (
    <div>
      <button
        onClick={() => {
          setshowNotificationModal(!showNotificationModal);
        }}
        className="relative p-2 rounded-full  dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100  duration-200 lg:ml-0 ml-3"
      >
        {notificationBtn}
        {
            (notifications.length>0) && <span className="absolute top-0 left-6 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white bg-red-400"></span>
        }

      </button>
      {/* <div className={`${showNotificationModal ? "block min-w-full md:min-w-fit min-h-screen md:min-h-fit" : "hidden"} w-[250px] pt-5 shadow-2xl absolute top-14 right-1 rounded-lg bg-white dark:bg-themeColor2`}>
                {
                    notifications?.map((notification) => (
                        <div key={notification._id} className="max-w-sm p-6 bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-start gap-3 items-center">
                                    <IoNotifications />
                                    <a href="#">
                                        <h5 className="mb-2 font-semibold tracking-tight text-gray-900 dark:text-white">New</h5>
                                    </a>
                                </div>
                                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{notification?.message}</p>
                                <div className="flex justify-center gap-6">
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Details</button>
                                    <button onClick={()=>handleNotificationDelete(notification._id)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mark Read</button>
                                    
                                </div>
                            
                        </div>
                    ))
                }
                
            </div> */}
      {/* {
                showNotificationModal && <NotificationCard className={" pt-5 shadow-2xl absolute bottom-28 right-1 rounded-lg bg-white dark:bg-themeColor2"} notifications={notifications}></NotificationCard>
            } */}
      <div
        className={`${
          showNotificationModal
            ? "block min-w-full md:min-w-fit min-h-screen md:min-h-fit"
            : "hidden"
        } w-[250px] pt-5 shadow-2xl absolute top-14 right-1 rounded-lg bg-white dark:bg-themeColor2`}
      >
        {notifications.length>0 ? (
          <div>
            <div className=" bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-3 shadow-sm">
              <div className="inline-flex items-center gap-5 justify-between w-full">
                <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">
                  Notifications
                </h3>
                <button
                    onClick={() => {
                        setshowNotificationModal(!showNotificationModal);
                      }}
                  className="inline-flex text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded font-medium
                        shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-blue-500
                        hover:text-white  dark:text-gray-800 dark:hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 sm:mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                  </svg>
                  Close
                </button>
              </div>
              {notifications.map((notification) => (
                <div
                onClick={()=>{
                    navigate(`/users/${notification?.relatedUserEmail}`)
                }}
                  key={notification._id}
                  className="mt-2 px-6 py-4 min-w-full md:min-w-80 bg-white rounded-lg shadow w-full cursor-pointer "
                >
                  <div className=" inline-flex items-center justify-between w-full">
                    <div className="inline-flex items-center">
                    <img
                    src={notification.relatedUserPhoto || basicUser}
                    alt={'/public/BasicUser.jpg'}
                    className="rounded-full border border-primary h-10 w-10 object-cover"
                  />
                      {/* <h3 className="font-bold text-base text-gray-800">
                        {notification?.type}
                      </h3> */}
                      <p className="text-xs text-gray-500 ml-4">
                        {moment(notification?.createdAt).fromNow()}
                      </p>
                    </div>
                        <RxCross2 onClick={()=>{
                            handleNotificationDelete(notification._id)
                        }} className="hover:text-red-500 text-xl" />
                  </div>
                  <p className="mt-1 text-sm">{notification?.message}</p>
                </div>
              ))}
              {/* <p className="mt-8 font-medium text-gray-500 dark:text-white text-sm sm:text-base">Yesterday</p> */}
            </div>
            <button
                onClick={()=>handleDeleteAllNotifications()}
              className="inline-flex text-sm bg-white justify-center px-4 py-2 mt-12 w-full text-red-500 items-center rounded font-medium
                    shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-red-500
                    hover:text-white   dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 sm:mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Clear all notifications
            </button>
          </div>
        ) : (
          <div className="min-h-60 bg-gray-100 -pt-5 flex items-center justify-center">
            <h2 className=" text-xl  font-medium">no new notifications</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationBtn;
