import LikeButton from "./LikeButton";
import DisLikeButton from "./DisLikeButton";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../Features/Users/UsersSlices";

import UseRuhulLikes from "../../../Hooks/UseRuhulLikes";
import UseRuhuldisLikes from "../../../Hooks/UseRuhuldislike";
import { useEffect, useState } from "react";

export default function PostActions({ data, user }) {
//  console.log(data, user);
  const axiosPublic = useAxiosPublic();



  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchUsers(user?.email));
    }
  }, [dispatch, user?.email]);
  const userId = users?.users.mainuser?._id
  const postId = data._id

  const [likeInfo,isLoading,likeRefetch]=UseRuhulLikes(userId,postId)
  const [ dislikesInfo,,dislikeRefetch]=UseRuhuldisLikes(userId,postId)
  
const [likeInfo2,setLikeInfo2]=useState(likeInfo)


  if(userId) {
    console.log(likeInfo,'likesInfo')
    console.log(dislikesInfo,'dislikesInfo')
    console.log(likeInfo2,'likesInfo2')
  }


  const handleLike = async (postId) => {
    console.log(postId);
   if(postId &&userId){


    axiosPublic.post(`/like-ruhul/${userId}`,{postId})
    .then((res)=>{
      console.log(res);
      likeRefetch()
      dislikeRefetch()

    })
    .catch((err)=>{
      console.log(err);
    })
   }

  };
  const  handleDislike = async (postId) => {
    console.log(postId);
   const userId = users?.users.mainuser?._id
   if(postId &&userId){


    axiosPublic.post(`/dislike-ruhul/${userId}`,{postId})
    .then((res)=>{
      likeRefetch()
      dislikeRefetch()
      console.log(res.data);

    })
    .catch((err)=>{
      console.log(err);
    })
   }

  };

  useEffect(()=>{
    setLikeInfo2(likeInfo)  // update state when likeInfo changes to prevent unnecessary rerenders
    likeRefetch()
    dislikeRefetch()
  },[     likeRefetch,
    dislikeRefetch,likeInfo])

  return (
    <div className="flex space-x-4">
      <LikeButton
         likeRefetch={  likeRefetch}
        likeInfo={likeInfo2}
        data={data}
        isLoading={isLoading}
        handleLike={() => handleLike(data._id)}
      />
      <DisLikeButton

        data={data}
        dislikesInfo={dislikesInfo}
        isLoading={isLoading}
        handleDislike={() => handleDislike( data._id)}
      />
    </div>
  );
}