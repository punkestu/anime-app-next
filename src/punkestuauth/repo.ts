import { AuthRepo, LoginResponse, Tokens } from "@/port/auth";

export default class AuthRepository implements AuthRepo {
  private url = process.env.PUNKESTU_AUTH;

  // constructor
  constructor() {
    if (!process.env.PUNKESTU_AUTH) {
      throw new Error("PUNKESTU_AUTH environment variable is not set " + process.env.PUNKESTU_AUTH);
    }
  }

  login(username: String, password: String): Promise<LoginResponse | null> {
    return fetch(this.url + "/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Login failed");
        }
        const data = await res.json();
        return {
          tokens: {
            token: data.accessToken,
            refreshToken: data.refreshToken,
          },
        };
      })
      .catch(() => null);
  }

  validate(tokens: Tokens): Promise<LoginResponse | null> {
    return fetch(this.url + "/v1/auth/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then(async (res) => {
      if (!res.ok) {
        const newtokens = await this.refresh(tokens);
        return newtokens;
      }
      
      return {
        tokens,
      };
    });
  }

  refresh(tokens: Tokens): Promise<LoginResponse | null> {
    return fetch(this.url + "/v1/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: "Bearer " + tokens.refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) {
          return null;
        }
        const data = await res.json();
        return {
          tokens: {
            token: data.accessToken,
            refreshToken: data.refreshToken,
          },
        };
      })
      .catch(() => null);
  }
}
