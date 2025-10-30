import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates NIE (Número de Identificación de Extranjero) format
 * NIE format: Letter (X,Y,Z) + 7 digits + Letter
 * Example: X1234567L
 */
export function nieValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value.toString().trim() === '') {
      return null; // Valid when empty
    }

    const nieValue = control.value.toString().toUpperCase().trim();

    // NIE regex: starts with X, Y, or Z, followed by 7 digits, ends with a letter
    const nieRegex = /^[XYZ]\d{7}[A-Z]$/;

    if (!nieRegex.test(nieValue)) {
      return { nieInvalid: { translationTag: 'form.nieInvalidError' } };
    }

    // Additional validation: check control digit
    const letterMap: { [key: string]: string } = {
      X: '0',
      Y: '1',
      Z: '2',
    };

    const numbers = letterMap[nieValue.charAt(0)] + nieValue.substring(1, 8);
    const remainder = parseInt(numbers) % 23;

    const controlLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const expectedLetter = controlLetters.charAt(remainder);

    const actualLetter = nieValue.charAt(8);

    if (actualLetter !== expectedLetter) {
      return { nieInvalid: { translationTag: 'form.nieInvalidError' } };
    }

    return null;
  };
}

/**
 * Validates DNI (Documento Nacional de Identidad) format
 * DNI format: 8 digits + Letter
 */
export function dniValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value.toString().trim() === '') {
      return null; // Valid when empty
    }

    const dniValue = control.value.toString().toUpperCase().trim();

    // DNI regex: 8 digits followed by a letter
    const dniRegex = /^\d{8}[A-Z]$/;

    if (!dniRegex.test(dniValue)) {
      return { dniInvalid: { translationTag: 'form.dniInvalidError' } };
    }

    // Validate control digit
    const numbers = dniValue.substring(0, 8);
    const letter = dniValue.charAt(8);
    const remainder = parseInt(numbers) % 23;

    const controlLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const expectedLetter = controlLetters.charAt(remainder);

    if (letter !== expectedLetter) {
      return { dniInvalid: { translationTag: 'form.dniInvalidError' } };
    }

    return null;
  };
}
