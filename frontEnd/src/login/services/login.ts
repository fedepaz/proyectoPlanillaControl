import axios from "axios";

import { LoginSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const loginUrl = "http://localhost:5555/session/login";
interface LoginResponse {
  dni: string;
}

export function useLogin(): UseMutationResult<
  LoginResponse,
  Error,
  LoginSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const res = await axios.post<LoginResponse>(loginUrl, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [""] });
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
}
