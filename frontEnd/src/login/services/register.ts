import axios, { AxiosError } from "axios";

import { RegisterSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { RegisterResponse } from "../../types/auth";
import { sessionService } from "../../services/sessionService";

export function useRegister(): UseMutationResult<
  RegisterResponse,
  Error,
  RegisterSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      try {
        const response = await sessionService.register(data);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error en el registro"
          );
        }
        throw error;
      }
    },

    onSuccess: async (data) => {
      queryClient.removeQueries();
      const successMessage =
        data.message ||
        "Registro exitoso, haz clic en el enlace para confirmar tu cuenta";

      console.log(successMessage);
    },
    onError: (error) => {
      sessionService.clearSession();
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ?? "Error de registro";
        console.error("Error de registro: ", errorMessage);
      } else {
        console.error("Error inesperado de registro: ", error);
      }
    },
  });
}
