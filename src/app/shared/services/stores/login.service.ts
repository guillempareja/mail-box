import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBody, LoginResponse } from '@shared/models/login-fetch.types';
import { MinecoApiService } from '../apis/mineco-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Injections
  private router = inject(Router);
  private minecoApiService = inject(MinecoApiService);

  // Data
  public userData = signal<LoginResponse | null>(null);

  // Methods
  public async login(credentials: LoginBody): Promise<void> {
    const response = await this.minecoApiService.login(credentials);
    localStorage.setItem('userData', JSON.stringify(response));
    this.userData.set(response);
    this.router.navigate(['/main']);
  }

  public async loadSession(): Promise<void> {
    const storedUserData = localStorage.getItem('userData');

    if (!storedUserData) {
      return;
    }

    const userData: LoginResponse = JSON.parse(storedUserData);
    this.userData.set(userData);

    try {
      const newToken = await this.minecoApiService.refreshToken(userData.token);
      userData.token = newToken.token;
      this.userData.set(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      this.logout();
    }
  }

  public logout(): void {
    this.userData.set(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
