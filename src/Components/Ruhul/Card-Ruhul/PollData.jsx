

const PollData = ({data}) => {
  


  const totalVotes = data?.poll?.reduce((sum, poll) => sum + poll.count, 0);

  return (
    <div>
      {data?.poll?.map((poll, index) => {
 
        const percentage = totalVotes ? ((poll.count / totalVotes) * 100).toFixed(2) : 0;

        return (
          <div key={index} className="mb-2 flex flex-col">
            <p className="flex justify-between items-center"> <p>{poll.item}</p> <span className="mr-2">Votes: {poll.count}</span> </p>
           
            <div className="flex items-center">
           
              
           
              <div className="w-full bg-gray-300 rounded">
                <div
                  className="bg-blue-500 text-xs font-medium text-white text-center p-1 rounded"
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
