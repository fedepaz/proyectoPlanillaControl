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
          sessionBackup.save(res.data);
          return res.data;
        } else {
          // Clear backup if server says not authenticated
          sessionBackup.clear();
          return res.data; // Return the unauthenticated response
        }
      } catch (error) {
        // Clear backup on error
        sessionBackup.clear();

        if (axios.isAxiosError(error)) {
          // If it's a 401 or session-related error, return unauthenticated state
          if (error.response?.status === 401) {
            return { authenticated: false, message: "Session expired" };
          }

          if (!error.response) {
            // Network error - try backup as last resort but don't rely on it
            const backup = sessionBackup.load();
            if (backup && backup.authenticated) {
              console.warn("Using backup session due to network error");
              return backup;
            }

            throw new Error(
              "Unable to connect to the server. Please check your connection and try again."
            );
          }
        }

        // For other errors, return unauthenticated state instead of throwing
        console.error("Session check failed:", error);
        return { authenticated: false, message: "Session check failed" };
      }
    },
    staleTime: 1000 * 60 * 5, // Reduced to 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: (failureCount, error) => {
      // Don't retry authentication errors
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }

      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (
          message.includes("unable to connect") ||
          message.includes("network error")
        ) {
          return failureCount < 2; // Reduced retries
        }
        return false;
      }
      return false;
    },
  });
}
