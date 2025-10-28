import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationErrorKey } from '@shared/enums/validation-error-keys.enum';
import { isDateAfter, isDateBefore } from '@shared/utils/dates.utils';
import { isValid } from 'date-fns';

/**
 * Helper function to safely convert control value to Date
 */
function getDateFromControl(control: AbstractControl): Date | null {
  if (!control.value) {
    return null;
  }

  const inputDate = new Date(control.value);

  if (!isValid(inputDate)) {
    return null; // Let other validators handle invalid dates
  }

  return inputDate;
}

/**
 * Validates that the date is not before today
 * Use case: Future dates only
 */
export function dateNotBeforeTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = getDateFromControl(control);

    if (!inputDate) {
      return null;
    }

    const today = new Date();

    // Use isDateBefore with includeEqual=false to check if date is strictly before today
    if (isDateBefore(inputDate, today, false)) {
      return { [ValidationErrorKey.DATE_NOT_BEFORE_TODAY]: true };
    }

    return null;
  };
}

/**
 * Validates that the date is not before or equal to today
 * Use case: Future dates only (excluding today)
 */
export function dateNotBeforeOrEqualTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = getDateFromControl(control);

    if (!inputDate) {
      return null;
    }

    const today = new Date();

    // Use isDateBefore with includeEqual=true to check if date is before or equal to today
    if (isDateBefore(inputDate, today, true)) {
      return { [ValidationErrorKey.DATE_NOT_BEFORE_OR_EQUAL_TODAY]: true };
    }

    return null;
  };
}

/**
 * Validates that the date is not after today
 * Use case: Past dates and today only
 */
export function dateNotAfterTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = getDateFromControl(control);

    if (!inputDate) {
      return null;
    }

    const today = new Date();

    // Use isDateAfter with includeEqual=false to check if date is strictly after today
    if (isDateAfter(inputDate, today, false)) {
      return { [ValidationErrorKey.DATE_NOT_AFTER_TODAY]: true };
    }

    return null;
  };
}

/**
 * Validates that the date is not after or equal to today
 * Use case: Past dates only (excluding today)
 */
export function dateNotAfterOrEqualTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = getDateFromControl(control);

    if (!inputDate) {
      return null; // Valid when empty or invalid
    }

    const today = new Date();

    // Use isDateAfter with includeEqual=true to check if date is after or equal to today
    if (isDateAfter(inputDate, today, true)) {
      return { [ValidationErrorKey.DATE_NOT_AFTER_OR_EQUAL_TODAY]: true };
    }

    return null;
  };
}
