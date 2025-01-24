import { Token } from './login-fetch.types';

export type RefreshTokenBody = {
  token: Token;
};

export type RefreshTokenResponse = {
  token: Token;
};
