import { Token } from './login-fetch.types';

export type RefreshTokenBody = {
  refreshToken: Token;
};

export type RefreshTokenResponse = {
  token: Token;
  refreshToken: Token;
};
