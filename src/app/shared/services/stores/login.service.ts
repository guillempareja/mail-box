import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBody, LoginResponse } from '@shared/models/login-fetch.types';
import { MailApiService } from '../apis/mail-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Injections
  private router = inject(Router);
  private mailApiService = inject(MailApiService);

  // Data
  public userData = signal<LoginResponse | null>(null);

  // Methods
  public async login(credentials: LoginBody): Promise<void> {
    const response = await this.mailApiService.login(credentials);
    localStorage.setItem('userData', JSON.stringify(response));
    this.userData.set(response);
    this.router.navigate(['/inbox']);
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
