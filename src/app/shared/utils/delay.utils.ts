/**
 * Pauses the execution of an async function for the specified duration.
 *
 * @param {number} ms - The time to pause execution, in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
export function sleep(ms?: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
