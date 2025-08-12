/**
 * Recursively removes empty properties from plain objects or arrays.
 * Leaves intact any non–plain-object instances (Date, RegExp, custom classes…).
 */
export function removeEmptyProperties<T>(obj: T): T | Partial<T> {
  // 1) Preserve non–plain objects (Date, RegExp, Map, custom classes…)
  if (
    obj !== null &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    Object.getPrototypeOf(obj) !== Object.prototype
  ) {
    return obj;
  }

  // 2) Base cases for "empty"
  if (obj == null || obj === '') {
    return obj;
  }

  // 3) Arrays: recurse y filtra
  if (Array.isArray(obj)) {
    return obj
      .map((item) => removeEmptyProperties(item))
      .filter((item) => item != null && item !== '') as T;
  }

  // 4) Plain objects: recorre sus entries
  if (typeof obj === 'object') {
    return (
      Object.entries(obj as Record<string, unknown>) as [keyof T, unknown][]
    ).reduce((acc, [key, value]) => {
      const cleaned = removeEmptyProperties(value as T);

      // Solo los plain objects vacíos se consideran para eliminar
      const isEmptyPlainObject =
        typeof cleaned === 'object' &&
        cleaned !== null &&
        !Array.isArray(cleaned) &&
        Object.getPrototypeOf(cleaned) === Object.prototype &&
        Object.keys(cleaned).length === 0;

      if (
        cleaned != null &&
        cleaned !== '' &&
        !(Array.isArray(cleaned) && cleaned.length === 0) &&
        !isEmptyPlainObject
      ) {
        acc[key] = cleaned as T[keyof T];
      }
      return acc;
    }, {} as Partial<T>);
  }

  // 5) Primitives no vacíos
  return obj;
}

/**
 * Retrieves the value from an object using a dot-separated path string.
 *
 * @param obj - The object to extract the value from.
 * @param path - The dot-separated string representing the path to the desired value.
 * @returns The value found at the given path, or `undefined` if not found.
 */
export function getValueByPath(
  obj: object | null | undefined,
  path: string,
): unknown {
  if (!obj) {
    return;
  }

  return path.split('.').reduce<unknown>((acc, part) => {
    if (!acc) {
      return;
    }

    return (acc as Record<string, unknown>)[part];
  }, obj);
}

/**
 * Checks if all properties of an object are null.
 *
 * @param obj - The object to check.
 * @returns True if all properties are null, false otherwise.
 */
export function areAllPropsNull(obj: Record<string, unknown>): boolean {
  return Object.values(obj).every((value) => value === null);
}
