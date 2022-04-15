export const formatDate = dateString => {
  let returnParam;
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  const getDate = new Date(dateString);

  const diff = today.getTime() - getDate.getTime();
  if (getDate.getDate() == today.getDate()) {
    returnParam = "Today at " + getDate.getHours() + ":" + getDate.getMinutes();
  } else if (diff <= 24 * 60 * 60 * 1000) {
    returnParam =
      "Yesterday at " + getDate.getUTCHours() + ":" + getDate.getUTCMinutes();
  } else {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return returnParam;
};
