import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { sessionService } from "../../services/sessionService";

export function useLogout(): UseMutationResult<unknown, Error, void> {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        const response = await sessionService.logout();
        return response;
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
