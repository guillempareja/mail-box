import _ from 'lodash';

/**
 * Recursively removes empty properties from an object or array.
 *
 * @template T - The type of the object or array to process.
 * @param obj - The object or array to clean. It can also be a primitive value.
 * @returns The cleaned object or array with empty properties removed, or the original value if it is not an object or array.
 */
export function removeEmptyProperties<T>(obj: T): T | Partial<T> {
  if (obj == null || obj === '') {
    return obj; // Base case for empty values
  }

  if (Array.isArray(obj)) {
    // Recursively process arrays
    return obj
      .map((item) => removeEmptyProperties(item))
      .filter((item) => item != null && item != '') as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    // Recursively process objects
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = removeEmptyProperties(value);
      if (
        cleanedValue != null &&
        cleanedValue != '' &&
        !(Array.isArray(cleanedValue) && cleanedValue.length === 0) &&
        !(
          typeof cleanedValue === 'object' &&
          Object.keys(cleanedValue).length === 0
        )
      ) {
        acc[key as keyof T] = cleanedValue;
      }
      return acc;
    }, {} as Partial<T>);
  }

  return obj; // Return non-empty primitive values
}
