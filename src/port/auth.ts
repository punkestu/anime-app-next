export interface AuthRepo {
  login: (username: String, password: String) => Promise<LoginResponse | null>;
  validate: (tokens: Tokens) => Promise<LoginResponse | null>;
}

export interface Tokens {
  token: String;
  refreshToken: String;
}

export interface LoginResponse {
  tokens: Tokens;
}
