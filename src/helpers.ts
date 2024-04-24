const MILLISECONDS = 1000;
const AN_HOUR_IN_MILLISECONDS = 3600 * MILLISECONDS;
const A_MINUTE_IN_MILLISECONDS = 60 * MILLISECONDS;

export const timeToMilliseconds = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hoursInMs = parseInt(hours) * 60 * 60 * 1000;
  const minutesInMs = parseInt(minutes) * 60 * 1000;
  return hoursInMs + minutesInMs;
};

export const millisecondsToTime = (timeInMilliseconds = 0) => {
  // Digital Clock conversion logic
  const hour = Math.floor(
    timeInMilliseconds / AN_HOUR_IN_MILLISECONDS
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const minute = Math.floor(
    (timeInMilliseconds % AN_HOUR_IN_MILLISECONDS) / A_MINUTE_IN_MILLISECONDS
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const time = `${hour}:${minute}`;
  return time;
};
