import axios from "axios";

import { LoginSchema } from "../types/loginSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const loginUrl = "http://localhost:5555/login";

export function useLogin(): UseMutationResult<
  void,
  Error,
  LoginSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      await axios.post(loginUrl, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [""] });
    },
  });
}
