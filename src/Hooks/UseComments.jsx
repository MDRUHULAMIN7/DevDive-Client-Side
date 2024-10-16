import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";


const UseComments = (postId) => {
    // const{postsss}=postId;
    const { user } = UseAuth();
    const axiosPublic = useAxiosPublic();
    const ruhul = true
    // console.log('hello',postId)
    const { data: comments = [], isLoading, refetch:commentRefetch } = useQuery({

        queryKey: ['comments', user?.email],
        enabled: ruhul, // Ensure query runs only if user email is available and not loading
        queryFn: async () => {
            const res = await axiosPublic.get(`/getComments/${postId}`); // Fetch posts data
            return res.data; // Return the data directly, assuming it's an array
        },
    });
    // refetch()

    console.log("UseComments",comments);

    console.log(comments.length); // Log the posts array to verify the result

    return [comments, isLoading, refetch];
=======
    commentRefetch()
    console.log(comments.length); // Log the posts array to verify the result

    return [comments, isLoading, commentRefetch];
>>>>>>> 21364d7b409a99f8ddb18dd261b1d4a927717232
};

export default UseComments;