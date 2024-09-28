import { intervalToDuration, formatDuration, format, differenceInDays } from 'date-fns';

const PostComponent = ({ data }) => {

  const postTime = new Date(data.createdAt);
  const now = new Date();


  const daysDifference = differenceInDays(now, postTime);


  if (daysDifference > 7) {
  
    const formattedDate = format(postTime, 'MMMM d, yyyy');
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Posted: {formattedDate}
      </p>
    );
  }

  
  const duration = intervalToDuration({
    start: postTime,
    end: now,
  });

  let formattedDuration;


  if (duration.days > 0) {
    formattedDuration = formatDuration(
      {
        days: duration.days,
        hours: duration.hours,
      },
      { format: ['days', 'hours'] }
    );
  } 

  else {
    formattedDuration = formatDuration(
      {
        hours: duration.hours,
        minutes: duration.minutes,
      },
      { format: ['hours', 'minutes'] }
    );
  }

  return (
    <p className="text-xs text-gray-500 dark:text-gray-400">
      Posted: {formattedDuration} ago
    </p>
  );
};

export default PostComponent;
