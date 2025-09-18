import { http, HttpResponse } from 'msw';
import { sleep } from '@shared/utils/delay.utils';
import { loginMock } from './mocks';

export const loginHandlers = [
  // POST /api/login
  http.post('/api/login', async () => {
    await sleep();
    return HttpResponse.json(loginMock);
  }),
];
