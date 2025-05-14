import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import {
  LoginBody,
  LoginResponse,
  Token,
} from '@shared/models/login-fetch.types';
import { CustomHeaders } from '@shared/enums/custom-headers.enum';
import {
  RefreshTokenBody,
  RefreshTokenResponse,
} from '@shared/models/refresh-token-fetch.types';
import { TestResponse } from '@shared/models/test-fetch.types';

@Injectable({
  providedIn: 'root',
})
export class MinecoApiService {
  // Injections
  private http = inject(HttpClient);

  // Methods
  public test(): Promise<TestResponse> {
    return firstValueFrom(
      this.http.get<TestResponse>('/test', {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public login(body: LoginBody): Promise<LoginResponse> {
    return firstValueFrom(
      this.http.post<LoginResponse>('/login', body, {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public refreshToken(refreshToken: Token): Observable<RefreshTokenResponse> {
    const body: RefreshTokenBody = { refreshToken };
    return this.http.post<RefreshTokenResponse>('/refreshToken', body, {
      headers: {
        [CustomHeaders.SHOW_LOADER]: 'true',
      },
    });
  }
}
