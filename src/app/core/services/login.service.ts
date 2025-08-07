import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBody, LoginResponse } from '@shared/models/login-fetch.types';
import { ApiService } from '@core/services/api.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { RefreshTokenResponse } from '@shared/models/refresh-token-fetch.types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Injections
  private router = inject(Router);
  private apiService = inject(ApiService);

  // Data
  public userData = signal<LoginResponse | null>(null);

  // Methods
  public async login(credentials: LoginBody): Promise<void> {
    const response = await this.apiService.login(credentials);
    localStorage.setItem('userData', JSON.stringify(response));
    this.userData.set(response);
    this.router.navigate(['/main']);
  }

  public refreshToken(): Observable<RefreshTokenResponse> {
    const storedUserData = localStorage.getItem('userData');
    const throwTokenError = () => {
      this.logout();
      return throwError(() => new Error('Failed to refresh token'));
    };

    if (!storedUserData) {
      throwTokenError();
    }

    const userData: LoginResponse = JSON.parse(storedUserData!);

    return this.apiService.refreshToken(userData.refreshToken).pipe(
      tap((response) => {
        const updatedUserData = {
          ...userData,
          ...response,
        };
        this.userData.set(updatedUserData);
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
      }),
      catchError(throwTokenError),
    );
  }

  public loadSession(): void {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      this.userData.set(JSON.parse(storedUserData));
    }
  }

  public logout(): void {
    this.userData.set(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
