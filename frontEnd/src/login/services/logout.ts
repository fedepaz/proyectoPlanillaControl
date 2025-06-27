import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../../services/csrfToken";

const logoutUrl = "/session/";

export function useLogout(): UseMutationResult<unknown, Error, void> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        const res = await apiClient.delete(logoutUrl, {
          withCredentials: true,
        });
        queryClient.clear();
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            throw new Error(
              "Unable to connect to the server. Please check your connection and try again."
            );
          }
        }

        throw new Error("An unexpected error occurred while logging out.");
      }
    },
  });
}
