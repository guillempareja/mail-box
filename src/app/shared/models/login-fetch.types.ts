export type Token = string;

export type LoginBody = {
  username: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  token: Token;
  refreshToken: Token;
};
