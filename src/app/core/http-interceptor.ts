import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from '@shared/models/login-fetch.types';
import { LoaderService } from '@shared/services/stores/loader.service';
import { Router } from '@angular/router';

export const customHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  // Injects
  const toastr = inject(ToastrService);
  const loaderService = inject(LoaderService);
  const router = inject(Router);

  const userDataString = localStorage.getItem('userData');
  const userData: LoginResponse | null =
    userDataString && JSON.parse(userDataString);
  const headers: Record<string, string> = {};
  if (userData?.token) {
    headers['Authorization'] = `Bearer ${userData.token}`;
  }

  const modifiedReq = req.clone({
    url: `${environment.minecoApi}${req.url}`,
    setHeaders: headers,
  });

  let shouldShowLoader = false;
  if (req.headers.has('X-Show-Loader')) {
    shouldShowLoader = true;
    loaderService.show();
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (req.url === '/login') {
          toastr.error('Usuario o contraseña incorrectos');
        } else {
          toastr.error('La sesión ha expirado');
          router.navigate(['/login']);
        }
      } else {
        toastr.error('Se ha producido un error');
      }

      return throwError(() => error);
    }),
    finalize(() => {
      if (shouldShowLoader) {
        loaderService.hide();
      }
    }),
  );
};
