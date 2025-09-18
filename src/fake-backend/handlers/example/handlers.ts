import { http, HttpResponse } from 'msw';
import { sleep } from '@shared/utils/delay.utils';
import {
  generatePDF,
  getDocumentHeaders,
  getWarningHeaders,
} from '../../utils';
import { exampleGetMock, examplePostMock, examplePutMock } from './mocks';

export const exampleHandlers = [
  // GET /api/example
  http.get('/api/example', async ({ request }) => {
    const authHeader = request.headers.get('authorization');

    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ') ||
      authHeader.split(' ')[1] !== 'tokenUsuario3'
    ) {
      return new HttpResponse(null, { status: 401 });
    }

    await sleep();

    return HttpResponse.json(exampleGetMock, {
      headers: getWarningHeaders('customWarning'),
    });
  }),

  // POST /api/example
  http.post('/api/example', async () => {
    await sleep();
    return HttpResponse.json(examplePostMock);
  }),

  // PUT /api/example/:id
  http.put('/api/example/:id', async () => {
    await sleep();
    return HttpResponse.json(examplePutMock);
  }),

  // GET /api/example/document
  http.get('/api/example/document', async () => {
    await sleep();

    const pdfBlob = generatePDF();
    const headers = getDocumentHeaders(
      'example-document.pdf',
      'application/pdf',
    );

    return new HttpResponse(pdfBlob, {
      status: 200,
      headers,
    });
  }),
];
