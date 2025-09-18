import { setupWorker } from 'msw/browser';
import { loginHandlers } from './handlers/login';
import { refreshTokenHandlers } from './handlers/refresh-token';
import { exampleHandlers } from './handlers/example';

// Configuración del Service Worker con todos los handlers
export const worker = setupWorker(
  ...loginHandlers,
  ...refreshTokenHandlers,
  ...exampleHandlers,
);
