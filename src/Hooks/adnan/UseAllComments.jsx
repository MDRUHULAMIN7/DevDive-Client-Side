import React from 'react';
import useAxiosPublic from '../useAxiosPublic';
import UseAuth from '../UseAuth';
import { useQuery } from '@tanstack/react-query';

const UseAllComments = () => {
  const { user } = UseAuth(); 
    const axiosPublic = useAxiosPublic(); 
    const ruhul = true
    // console.log('hello',postId)
    const { data: allComments = [], isLoading, refetch } = useQuery({

        queryKey: ['allComments', user?.email],
        enabled: ruhul, // Ensure query runs only if user email is available and not loading
        queryFn: async () => {
            const res = await axiosPublic.get(`/getComments`); // Fetch posts data
            return res.data; // Return the data directly, assuming it's an array
        },
    });
    refetch()
    console.log(allComments.length); // Log the posts array to verify the result

    return [allComments, isLoading, refetch];
};

export default UseAllComments;