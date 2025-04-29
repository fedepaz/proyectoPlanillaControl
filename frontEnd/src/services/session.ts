import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiClient from "./csrfToken";

const API_URL = import.meta.env.VITE_API_URL;
const sessionUrl = `${API_URL}/session`;

interface SessionResponse {
  authenticated: boolean;
  user: {
    dni: string;
    oficialId: {
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
      id: string;
    };
    role: string;
  };
}

export function useSession(): UseQueryResult<SessionResponse, Error> {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const res = await apiClient.get<SessionResponse>(sessionUrl, {
          withCredentials: true,
        });

        return res.data;
      } catch (error) {
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
          message.includes("unable to connect") ||
          message.includes("internal server error")
        ) {
          return failureCount < 3;
        }
        return false;
      }
      return false;
    },
  });
}
