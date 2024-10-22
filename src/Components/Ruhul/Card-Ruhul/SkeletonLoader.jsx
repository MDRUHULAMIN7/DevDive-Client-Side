const SkeletonLoader = ({ value }) => (
  <div>
    {value == "Slider" && <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg ">

      <div className="animate-pulse flex flex-col justify-end h-[225px]">
          <div className="flex items-end space-x-4 p-4">

            <div className="rounded-full bg-gray-300 dark:bg-gray-700 h-12 w-12 "></div>

            <div className="flex-1">

              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>

              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5 mb-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
      </div>
    </div>}
    {value == "SideBar" && <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 my-4">

      <div className="animate-pulse flex flex-col space-y-4">
      <div className="bg-gray-300 dark:bg-gray-700 rounded w-full h-[128px] mt-4"></div>
          <div className="flex items-start space-x-4">

            <div className="rounded-full bg-gray-300 dark:bg-gray-700 h-12 w-12 "></div>

            <div className="flex-1">

              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>

              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5 mb-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
      </div>
    </div>}
    {value == "PostCard" && <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg">

      <div className="animate-pulse flex flex-col space-y-4 p-4">
        <div className="flex justify-center items-start w-full space-x-4">

          <div className="rounded-full bg-gray-300 dark:bg-gray-700 h-12 min-w-12 "></div>

          <div className="w-full">

            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-[100px] mb-2"></div>

            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5 mb-1"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 rounded w-full h-[400px] mt-4"></div>
      </div>
    </div>}
  </div>
);

export default SkeletonLoader;
