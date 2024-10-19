const SkeletonLoader = () => (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 my-4">

      <div className="animate-pulse flex flex-col space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-start space-x-4">
      
            <div className="rounded-full bg-gray-300 dark:bg-gray-700 h-12 w-12 "></div>
  
            <div className="flex-1">
            
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>

              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5 mb-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default SkeletonLoader;
  