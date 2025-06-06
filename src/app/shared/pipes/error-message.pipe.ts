import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationErrorKey } from '@shared/enums/validation-error-keys.enum';

const DEFAULT_ERROR_MESSAGES: Record<string, string> = {
  [ValidationErrorKey.REQUIRED]: 'Campo obligatorio',
  // add more common validation keys and default messages here
};
@Pipe({ name: 'errorMessage', standalone: true, pure: false })
export class ErrorMessagePipe implements PipeTransform {
  /**
   * Returns an error message based on the first error found among one or more controls.
   * - Accepts a single AbstractControl or an array of them.
   * - Finds the first control that has an error and retrieves its first error key.
   * - Uses default messages for known keys unless overridden by errorMessages.
   * - Tries exact key match first, then substring match (case-insensitive).
   * - Falls back to a generic message if no matches found.
   *
   * @param controls      One control or an array of controls to inspect.
   * @param errorMessages Optional overrides e.g. { email: 'Correo inválido' }.
   */
  transform(
    controls: AbstractControl | AbstractControl[],
    errorMessages: Record<string, string> = {},
  ): string {
    if (!controls) {
      return '';
    }

    // Normalize to array
    const list: AbstractControl[] = Array.isArray(controls)
      ? controls.filter((item): item is AbstractControl => !!item)
      : [controls];

    // Find first control that has errors
    let errorKey: string | undefined;
    for (const control of list) {
      const keys = control.errors ? Object.keys(control.errors) : [];
      if (keys.length) {
        errorKey = keys[0];
        break;
      }
    }

    if (!errorKey) {
      return '';
    }

    // Merge default messages with any custom errorMessages
    const allMessages: Record<string, string> = {
      ...DEFAULT_ERROR_MESSAGES,
      ...errorMessages,
    };

    // Exact match takes priority
    if (allMessages[errorKey]) {
      return allMessages[errorKey];
    }

    // Otherwise check for substring match (case-insensitive)
    const lowerKey = errorKey.toLowerCase();
    for (const msgKey of Object.keys(allMessages)) {
      if (lowerKey.includes(msgKey.toLowerCase())) {
        return allMessages[msgKey];
      }
    }

    // Generic fallback message
    return 'Campo inválido';
  }
}
