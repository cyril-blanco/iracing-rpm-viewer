import { intervalToDuration } from "date-fns";

export const laptimeToHumanReadable = (value: number) => {
  value = value / 10;
  const duration = intervalToDuration({ start: 0, end: value });
  return `${duration.minutes}:${duration.seconds}.${Math.round(value % 1000)}`;
};
