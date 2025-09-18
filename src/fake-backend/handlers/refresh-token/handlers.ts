import { http, HttpResponse } from 'msw';
import { sleep } from '@shared/utils/delay.utils';
import { refreshTokenMock } from './mocks';

export const refreshTokenHandlers = [
  // POST /api/refreshToken
  http.post('/api/refreshToken', async () => {
    await sleep();
    return HttpResponse.json(refreshTokenMock);
  }),
];
