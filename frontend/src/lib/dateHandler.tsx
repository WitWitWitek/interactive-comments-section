export default function dateHandler(date: string) {
  let formattedDate: string;
  const milisecondsAgo = new Date().getTime() - new Date(date).getTime();
  const secondsAgo = Math.round(milisecondsAgo / (1000));

  const minutes = Math.round(secondsAgo / 60);
  const hours = Math.round(secondsAgo / (60 * 60));
  const days = Math.round(secondsAgo / (60 * 60 * 24));
  const weeks = Math.round(secondsAgo / (60 * 60 * 24 * 7));
  const months = Math.round(secondsAgo / (60 * 60 * 24 * 31));
  const years = Math.round(secondsAgo / (60 * 60 * 24 * 31 * 12));

  const checkSuffix = (time: number): string => (time > 1 ? 's' : '');

  if (secondsAgo > (60 * 60 * 24 * 31 * 12)) {
    formattedDate = `${years} year${checkSuffix(years)} ago`;
  } else if (secondsAgo > (60 * 60 * 24 * 31)) {
    formattedDate = `${months} month${checkSuffix(months)} ago`;
  } else if (secondsAgo > (60 * 60 * 24 * 7)) {
    formattedDate = `${weeks} week${checkSuffix(weeks)} ago`;
  } else if (secondsAgo > (60 * 60 * 24)) {
    formattedDate = `${days} day${checkSuffix(days)} ago`;
  } else if (secondsAgo > (60 * 60)) {
    formattedDate = `${hours} hour${checkSuffix(hours)} ago`;
  } else if (secondsAgo > 60) {
    formattedDate = `${minutes} minute${checkSuffix(minutes)} ago`;
  } else {
    formattedDate = `${secondsAgo} second${checkSuffix(secondsAgo)} ago`;
  }
  return formattedDate;
}
