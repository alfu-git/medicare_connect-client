import { format, isToday, formatDistanceToNow } from "date-fns";

export const relativeTimeFormat = (createdAt) => {
  const date = new Date(createdAt);

  if (isToday(date)) {
    // show time with AM/PM
    return format(date, "hh:mm a");
  } else {
    // show relative time
    return formatDistanceToNow(date, { addSuffix: true });
  }
};
