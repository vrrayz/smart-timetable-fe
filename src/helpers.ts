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

export const millisecondsToStandardTime = (timeInMilliseconds = 0) => {
  const millitaryFormat = millisecondsToTime(timeInMilliseconds);
  const hour = parseInt(millitaryFormat.split(":")[0]);
  let newHour = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  let newMinute = parseInt(millitaryFormat.split(":")[1]).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
    }
  );
  let amPm = "";
  if (hour >= 12) {
    amPm = "pm";

    newHour =
      hour > 12
        ? (hour % 12).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
          })
        : newHour;
  } else {
    amPm = "am";
  }
  return `${newHour}:${newMinute} ${amPm}`;
};
