import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';

/**
 * Checks if a target date is strictly before or optionally equal to a given end date.
 *
 * @param targetDate - The date to compare.
 * @param endDate - The reference end date.
 * @param includeEqual - Whether to include equality in the comparison (default: true).
 * @returns True if the target date is before (or equal, if specified) the end date.
 */
export function isDateBefore(
  targetDate: Date,
  endDate: Date,
  includeEqual: boolean = true,
): boolean {
  const comparisonDate = endOfDay(endDate);
  return includeEqual
    ? targetDate <= comparisonDate
    : targetDate < comparisonDate;
}

/**
 * Checks if a target date is strictly after or optionally equal to a given start date.
 *
 * @param targetDate - The date to compare.
 * @param startDate - The reference start date.
 * @param includeEqual - Whether to include equality in the comparison (default: true).
 * @returns True if the target date is after (or equal, if specified) the start date.
 */
export function isDateAfter(
  targetDate: Date,
  startDate: Date,
  includeEqual: boolean = true,
): boolean {
  const comparisonDate = startOfDay(startDate);
  return includeEqual
    ? targetDate >= comparisonDate
    : targetDate > comparisonDate;
}

/**
 * Checks if a target date falls within a specified date range (inclusive of the start and end days).
 *
 * @param targetDate - The date to check.
 * @param startDate - The start date of the range (inclusive).
 * @param endDate - The end date of the range (inclusive).
 * @returns True if the target date is within the specified range, false otherwise.
 */
export function isDateWithinRange(
  targetDate: Date,
  startDate: Date,
  endDate: Date,
): boolean {
  if (endOfDay(endDate) < startOfDay(startDate)) {
    return false;
  }

  return isWithinInterval(targetDate, {
    start: startOfDay(startDate),
    end: endOfDay(endDate),
  });
}
