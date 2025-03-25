// src/services/authService.ts
import { API_AUTH } from "./apiUrl";
import { AuthResponse, LoginCredentials } from "../models/Auth";

export function loginUser(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  return fetch(API_AUTH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response.json();
  });
}
