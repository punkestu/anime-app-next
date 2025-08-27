export interface AuthRepo {
  login: (username: string, password: string) => Promise<LoginResponse | null>;
  validate: (tokens: Tokens) => Promise<LoginResponse | null>;
}

export interface Tokens {
  token: string;
  refreshToken: string;
}

export interface LoginResponse {
  tokens: Tokens;
}
