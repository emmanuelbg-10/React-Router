// src/services/aboutService.ts
import { AboutInfo } from "../models/About";
import { API_ABO } from "./apiUrl";

export async function fetchAboutInfo(): Promise<AboutInfo> {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return fetch(API_ABO, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: No se pudo obtener la información`
      );
    }
    return response.json();
  });
}
