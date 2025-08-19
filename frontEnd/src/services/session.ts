import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiClient from "./csrfToken";

const API_URL = import.meta.env.VITE_API_URL;
const sessionUrl = `${API_URL}/session`;
import { SessionResponse } from "../types/auth";
import { sessionBackup } from "./sessionBackup";

export function useSession(): UseQueryResult<SessionResponse, Error> {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const res = await apiClient.get<SessionResponse>(sessionUrl, {
          withCredentials: true,
        });
        if (res.data.authenticated) {
          sessionBackup.save(res.data); // ← NUEVA LÍNEA
        }

        return res.data;
      } catch (error) {
        const backup = sessionBackup.load(); // ← NUEVA LÍNEA
        if (backup && backup.authenticated) {
          return backup;
        }
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            throw new Error(
              "Unable to connect to the server. Please check your connection and try again."
            );
          }
        }

        throw new Error(
          "An unexpected error occurred while fetching session data."
        );
      }
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (
          message.includes("Está dificil de conectarse") ||
          message.includes("Error interno del servidor, estamos trabajando")
        ) {
          return failureCount < 3;
        }
        return false;
      }
      return false;
    },
  });
}
