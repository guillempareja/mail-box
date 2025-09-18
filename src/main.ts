import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { environment } from './environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

registerLocaleData(localeEs, 'es-ES');

async function enableMocking() {
  if (!environment.useMSW) {
    console.log('🌐 Using real API:', environment.api);
    return;
  }

  console.log('🛠️ Initializing MockServiceWorker...');

  try {
    const { worker } = await import('./fake-backend/browser');

    return worker
      .start({
        onUnhandledRequest: 'bypass',
      })
      .then(() => {
        console.log('✅ MockServiceWorker intercepting requests');
      });
  } catch (error) {
    console.warn('MSW not available in this build');
  }
}

async function initializeApp() {
  // Initialize MSW first
  await enableMocking();

  // Bootstrap the application
  const appRef = await bootstrapApplication(AppComponent, appConfig);

  // Initialize translations after app is bootstrapped
  const translateService = appRef.injector.get(TranslateService);
  await firstValueFrom(translateService.use('es'));

  return appRef;
}

initializeApp().catch((err) => console.error(err));
