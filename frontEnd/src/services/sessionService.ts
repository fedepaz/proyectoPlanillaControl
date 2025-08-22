import authClient from "./authClient";
import { SessionResponse } from "../types/auth";
import { LoginSchema, RegisterSchema } from "../login/types/modelsSchema";
import { sessionBackup } from "./sessionBackup";
import axios from "axios";
import apiClient from "./csrfToken";

export const sessionService = {
  // Login
  login: async (credentials: LoginSchema): Promise<SessionResponse> => {
    try {
      const response = await apiClient.post<SessionResponse>(
        "/session/login",
        credentials
      );

      if (response.data.authenticated) {
        sessionBackup.save(response.data);
      } else {
        sessionBackup.clear();
      }

      return response.data;
    } catch (error) {
      sessionBackup.clear();
      throw error;
    }
  },

  // Verificar sesión
  getSession: async (): Promise<SessionResponse> => {
    try {
      const response = await authClient.get<SessionResponse>("/session");

      if (response.data.authenticated) {
        sessionBackup.save(response.data);
      } else {
        sessionBackup.clear();
      }

      return response.data;
    } catch (error) {
      sessionBackup.clear();

      // If it's a 401, return unauthenticated instead of throwing
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return {
          authenticated: false,
          message: "Unauthorized",
          user: {
            dni: "",
            oficialId: {
              dni: "",
              firstname: "",
              lastname: "",
              legajo: "",
              id: "",
              currentAirportId: {
                aeropuerto: "",
                codIATA: "",
                codOACI: "",
                id: "",
              },
              jerarquiaId: {
                jerarquia: "",
                id: "",
              },
            },
            role: "",
          },
        };
      }

      throw error;
    }
  },

  // Register with auto-login
  register: async (
    registerData: RegisterSchema
  ): Promise<{ success: boolean; message: string; userID: string }> => {
    try {
      const response = await authClient.post<{
        success: boolean;
        message: string;
        userID: string;
      }>("/session/register", registerData);

      // Registration doesn't auto-login based on your backend code
      // So we clear any existing session data
      sessionBackup.clear();

      return response.data;
    } catch (error) {
      sessionBackup.clear();
      throw error;
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await apiClient.delete("/session");
    } catch (error) {
      console.warn("Logout request failed:", error);
      // Continue with cleanup even if request fails
    } finally {
      sessionBackup.clear();
    }
  },

  // Verificar si hay sesión válida local (para UI optimista)
  hasLocalSession: (): boolean => {
    const backup = sessionBackup.load();
    return !!(backup && backup.authenticated && isBackupValid(backup));
  },

  // Clear all session data
  clearSession: (): void => {
    sessionBackup.clear();
  },
};

// Helper function

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBackupValid = (backup: any): boolean => {
  const maxAge = 12 * 60 * 60 * 1000; // 12 horas
  return backup.timestamp && Date.now() - backup.timestamp < maxAge;
};
