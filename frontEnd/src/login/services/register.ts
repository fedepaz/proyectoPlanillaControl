import axios, { AxiosError } from "axios";

import { RegisterSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "../../services/csrfToken";

import { RegisterResponse } from "../../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

const registerUrl = "/session/register";

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
        const res = await apiClient.post<RegisterResponse>(
          `${API_URL}${registerUrl}`,
          data
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Error en el registro"
          );
        }
        throw error;
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [""] });
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
