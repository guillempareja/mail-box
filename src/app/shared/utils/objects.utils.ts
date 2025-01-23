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

/**
 * Updates an item in a list by replacing it with a new version if it exists.
 *
 * @template T - The type of items in the list.
 * @param list - The array of items to update.
 * @param updatedItem - The updated item to replace the existing one in the list.
 * @returns A new array with the updated item, or the original array if the item is not found.
 */
export function updateList<T>(list: T[], updatedItem: T): T[] {
  const index = list.findIndex((item) => _.isEqual(item, updatedItem));

  if (index !== -1) {
    const updatedList = [...list];
    updatedList[index] = updatedItem;
    return updatedList;
  }

  return list;
}
