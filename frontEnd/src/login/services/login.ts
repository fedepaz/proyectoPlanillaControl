import { AxiosError } from "axios";

import { LoginSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { LoginResponse } from "../../types/auth";

import { sessionService } from "../../services/sessionService";

export function useLogin(): UseMutationResult<
  LoginResponse,
  Error,
  LoginSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await sessionService.login(data);
      return response;
    },
    onSuccess: async (data) => {
      if (data.authenticated) {
        queryClient.removeQueries();
        await queryClient.invalidateQueries({ queryKey: ["session"] });
        window.location.href = "/";
      }
    },
    onError: (error) => {
      sessionService.clearSession();
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ?? "Error de autenticación";
        console.error("Error de autenticación: ", errorMessage);
      } else {
        console.error("Error inesperado login: ", error);
      }
    },
  });
}
