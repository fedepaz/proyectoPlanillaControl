import axios, { AxiosError } from "axios";

import { LoginSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const loginUrl = "http://localhost:5555/session/login";
interface LoginResponse {
  user: {
    dni: string;
    oficialId: {
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
    };
  };
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Ocurrió un error inesperado";
      return errorMessage;
    },
  });
}
