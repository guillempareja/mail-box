import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // Data
  private _isLoading = signal<boolean>(false);

  // Computed
  isLoading = computed(() => this._isLoading());

  // Methods
  public show(): void {
    this._isLoading.set(true);
  }

  public hide(): void {
    this._isLoading.set(false);
  }
}
