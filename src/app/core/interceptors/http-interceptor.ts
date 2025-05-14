import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoaderService } from '@core/services/loader.service';
import { LoginService } from '@core/services/login.service';
import { CustomHeaders } from '@shared/enums/custom-headers.enum';

export const customHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const toastr = inject(ToastrService);
  const loaderService = inject(LoaderService);
  const loginService = inject(LoginService);

  const headers: Record<string, string> = {};
  if (loginService.userData()) {
    headers['Authorization'] = `Bearer ${loginService.userData()!.token}`;
  }

  const modifiedReq = req.clone({
    url: `${environment.minecoApi}${req.url}`,
    setHeaders: headers,
  });

  let shouldShowLoader = false;
  if (req.headers.has(CustomHeaders.SHOW_LOADER)) {
    shouldShowLoader = true;
    loaderService.show();
  }

  const handleSessionExpired = () => {
    toastr.error('La sesión ha expirado');
    loginService.logout();
  };

  const refreshTokenAndRefetch = () => {
    return loginService.refreshToken().pipe(
      switchMap((token) =>
        next(
          modifiedReq.clone({
            url: modifiedReq.urlWithParams,
            setHeaders: {
              Authorization: `Bearer ${token?.token}`,
            },
          }),
        ),
      ),
      catchError((error: HttpErrorResponse) => {
        handleSessionExpired();
        return throwError(() => new Error(error.message));
      }),
    );
  };

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (req.url === '/login') {
          toastr.error('Usuario o contraseña incorrectos');
          return throwError(() => new Error(error.message));
        } else if (req.url === '/refreshToken') {
          handleSessionExpired();
          return throwError(() => new Error(error.message));
        } else {
          return refreshTokenAndRefetch();
        }
      }

      toastr.error('Se ha producido un error');
      return throwError(() => new Error(error.message));
    }),
    finalize(() => {
      if (shouldShowLoader) {
        loaderService.hide();
      }
    }),
  );
};
