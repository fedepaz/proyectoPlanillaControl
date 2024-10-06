import axios from "axios";

import { LoginSchema } from "../types/loginSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const loginUrl = "http://localhost:5555/session/login";

export function useLogin(): UseMutationResult<
  void,
  Error,
  LoginSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const res = await axios.post(loginUrl, data);
      return res.data;
    },
    onSuccess: async (data) => {
      console.log("login success", data);
      await queryClient.invalidateQueries({ queryKey: [""] });
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
}
