import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const logoutUrl = "/session/";

export function useLogout(): UseMutationResult<unknown, Error, void> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      console.log("Sending logout");
      const response = await axios.delete(`${API_URL}${logoutUrl}`, {
        withCredentials: true,
      });
      console.log(response);
      return response.data;
    },
    onSuccess: async () => {
      console.log("Logout success:");

      queryClient.removeQueries();

      window.location.href = "/";

      await queryClient.invalidateQueries({ queryKey: [""] });
    },
    onError: (error) => {
      return error;
    },
  });
}
