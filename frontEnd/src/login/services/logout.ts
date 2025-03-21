/**
 * Logout service
 * sessionRouter.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout connected" });
});
 */

import axios from "axios";

import { LogoutSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const logoutUrl = "http://localhost:5555/session/logout";

export function useLogout(): UseMutationResult<
  void,
  Error,
  LogoutSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LogoutSchema) => {
      console.log("Sending logout data:", data);
      const res = await axios.post(logoutUrl, data, { withCredentials: true });
      return res.data;
    },
    onSuccess: async (data) => {
      console.log("Logout success:", data);
      //redirect to login page
      window.location.href = "/";

      await queryClient.invalidateQueries({ queryKey: [""] });
    },
    onError: (error) => {
      return error;
    },
  });
}
