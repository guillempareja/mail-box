import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';

/**
 * Checks if a target date is strictly before or optionally equal to a given end date.
 *
 * @param targetDate - The date to compare.
 * @param endDate - The reference end date.
 * @param includeEqual - Whether to include equality in the comparison (default: true).
 * @param ignoreTime - Whether to ignore the time part and compare only the date (default: true).
 * @returns True if the target date is before (or equal, if specified) the end date.
 */
export function isDateBefore(
  targetDate: Date,
  endDate: Date,
  includeEqual: boolean = true,
  ignoreTime: boolean = true,
): boolean {
  const dateToCompare = ignoreTime ? startOfDay(targetDate) : targetDate;
  const referenceDate = ignoreTime ? startOfDay(endDate) : endDate;

  return includeEqual
    ? dateToCompare <= referenceDate
    : dateToCompare < referenceDate;
}

/**
 * Checks if a target date is strictly after or optionally equal to a given start date.
 *
 * @param targetDate - The date to compare.
 * @param startDate - The reference start date.
 * @param includeEqual - Whether to include equality in the comparison (default: true).
 * @param ignoreTime - Whether to ignore the time part and compare only the date (default: true).
 * @returns True if the target date is after (or equal, if specified) the start date.
 */
export function isDateAfter(
  targetDate: Date,
  startDate: Date,
  includeEqual: boolean = true,
  ignoreTime: boolean = true,
): boolean {
  const dateToCompare = ignoreTime ? startOfDay(targetDate) : targetDate;
  const referenceDate = ignoreTime ? startOfDay(startDate) : startDate;

  return includeEqual
    ? dateToCompare >= referenceDate
    : dateToCompare > referenceDate;
}

/**
 * Checks if a target date falls within a specified date range.
 *
 * If ignoreTime is true (default), the comparison is done using only the date parts,
 * ignoring the time (hours, minutes, seconds).
 *
 * @param targetDate - The date to check.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @param ignoreTime - Whether to ignore the time component (default: true).
 * @returns True if the target date is within the specified range, false otherwise.
 */
export function isDateWithinRange(
  targetDate: Date,
  startDate: Date,
  endDate: Date,
  ignoreTime: boolean = true,
): boolean {
  let rangeStart: Date;
  let rangeEnd: Date;
  let dateToCheck: Date;

  if (ignoreTime) {
    rangeStart = startOfDay(startDate);
    rangeEnd = endOfDay(endDate);
    dateToCheck = startOfDay(targetDate);
  } else {
    rangeStart = startDate;
    rangeEnd = endDate;
    dateToCheck = targetDate;
  }

  if (rangeEnd < rangeStart) {
    return false;
  }

  return isWithinInterval(dateToCheck, {
    start: rangeStart,
    end: rangeEnd,
  });
}
