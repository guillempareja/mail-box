import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginBody, LoginResponse, Token } from '@shared/models/login.types';
import { HttpCustomHeader } from '@shared/enums/http-custom-headers.enum';
import {
  RefreshTokenBody,
  RefreshTokenResponse,
} from '@shared/models/refresh-token.types';
import {
  ExampleDocumentResponse,
  ExampleResponse,
} from '@shared/models/example.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Injections
  private http = inject(HttpClient);

  // Methods
  public getExample(): Promise<ExampleResponse> {
    return firstValueFrom(
      this.http.get<ExampleResponse>('/example', {
        headers: {
          [HttpCustomHeader.CUSTOM_SUCCESS_MESSAGE]: 'customSuccess',
        },
      }),
    );
  }

  public login(body: LoginBody): Promise<LoginResponse> {
    return firstValueFrom(this.http.post<LoginResponse>('/login', body));
  }

  public refreshToken(refreshToken: Token): Observable<RefreshTokenResponse> {
    const body: RefreshTokenBody = { refreshToken };
    return this.http.post<RefreshTokenResponse>('/refreshToken', body);
  }

  public getExampleDocument(): Promise<ExampleDocumentResponse> {
    return firstValueFrom(
      this.http.get('/example/document', {
        responseType: 'blob',
      }),
    );
  }
}
