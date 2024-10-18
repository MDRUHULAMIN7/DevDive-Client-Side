import React, { useContext, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Providers/AuthProvider';

const PollData = ({ pollPost }) => {
  const { user, setIsModalOpen } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(pollPost);
  const [error, setError] = useState(null);

  const handleVote = async (pollItem) => {
    if (user) {
      try {
        const response = await axiosPublic.put(`/posts/${pollPost._id}/poll/vote`, {
          pollItem,
          email: user?.email,
        });

        const updatedPost = response.data;
        setData(updatedPost);
      } catch (err) {
        console.error('Error voting:', err);
        setError(err.response?.data?.message || 'Error casting vote');
      }
    }
    if(!user){
      setIsModalOpen(true)
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  const totalVotes = data?.poll?.reduce((sum, poll) => sum + poll.count, 0);

  return (
    <div>
      {data?.poll?.map((poll, index) => {
        const percentage = totalVotes ? ((poll.count / totalVotes) * 100).toFixed(2) : 0;

        return (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <p>{poll.item}</p>
              <span className="mr-2">Votes: {poll.count}</span>
            </div>
            <div className="flex items-center">
              <div onClick={() => handleVote(poll.item)} className="w-full bg-gray-400 rounded">
                <div
                  className="bg-sec-color text-xs font-bold text-white text-center p-1 rounded"
                  style={{ width: `${percentage}%` }}
                >
                  {percentage}%
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PollData;
