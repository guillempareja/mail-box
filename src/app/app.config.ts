import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpCache, withHttpCacheInterceptor } from '@ngneat/cashew';
import { customHttpInterceptor } from '@core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    provideHttpClient(
      withInterceptors([withHttpCacheInterceptor(), customHttpInterceptor]),
      withFetch(),
    ),
    provideHttpCache(),
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
};
