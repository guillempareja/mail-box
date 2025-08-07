import { Token } from './login.types';

export type RefreshTokenBody = {
  refreshToken: Token;
};

export type RefreshTokenResponse = {
  token: Token;
  refreshToken: Token;
};
