/**
 * A class to manage a promise externally by exposing its resolve and reject methods.
 *
 * @template T - The type of the value that the promise resolves to. Defaults to `boolean`.
 */
export class ManageablePromise<T = boolean> {
  public resolve!: (value: T | PromiseLike<T>) => void;
  public reject!: (reason: Error) => void;
  public promise!: Promise<T>;

  public initPromise(): void {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
