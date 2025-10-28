export enum ValidationErrorKey {
  REQUIRED = 'required',
  NIE_INVALID = 'nieInvalid',
  DNI_INVALID = 'dniInvalid',
  DATE_NOT_BEFORE_TODAY = 'dateNotBeforeToday',
  DATE_NOT_BEFORE_OR_EQUAL_TODAY = 'dateNotBeforeOrEqualToday',
  DATE_NOT_AFTER_TODAY = 'dateNotAfterToday',
  DATE_NOT_AFTER_OR_EQUAL_TODAY = 'dateNotAfterOrEqualToday',
  MAX_LENGTH = 'maxLength',
  MIN_LENGTH = 'minLength',
  EXACT_LENGTH = 'exactLength',
  NUMERIC = 'numeric',
}
