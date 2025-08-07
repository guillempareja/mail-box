import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '@core/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private loginService = inject(LoginService);

  canActivate(): boolean {
    const userData = this.loginService.userData();

    if (userData?.token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
