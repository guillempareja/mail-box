import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  LoginBody,
  LoginResponse,
  Token,
} from '@shared/models/login-fetch.types';
import { CustomHeaders } from '../../enums/custom-headers.enum';
import {
  RefreshTokenBody,
  RefreshTokenResponse,
} from '@shared/models/refresh-token-fetch.types';

@Injectable({
  providedIn: 'root',
})
export class MinecoApiService {
  // Injections
  private http = inject(HttpClient);

  // Methods
  public login(body: LoginBody): Promise<LoginResponse> {
    return firstValueFrom(
      this.http.post<LoginResponse>('/login', body, {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public refreshToken(token: Token): Promise<RefreshTokenBody> {
    const body = { token };
    return firstValueFrom(
      this.http.post<RefreshTokenResponse>('/refreshToken', body, {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }
}
