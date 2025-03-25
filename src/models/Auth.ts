// src/models/Auth.ts
export interface AuthResponse {
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
