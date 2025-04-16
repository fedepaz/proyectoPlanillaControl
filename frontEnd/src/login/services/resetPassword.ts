import axios, { AxiosError } from "axios";

import {
  ResetPasswordRequestSchema,
  ResetPasswordSchema,
} from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;
const resetPasswordUrl = `${API_URL}/resetPassword`;

interface ResetPasswordResponse {
  message: string;
}

export function useRequestResetPasswordService(): UseMutationResult<
  ResetPasswordResponse,
  Error,
  ResetPasswordRequestSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ResetPasswordRequestSchema) => {
      const res = await axios.post<ResetPasswordResponse>(
        resetPasswordUrl,
        data,
        {
          withCredentials: true,
        }
      );
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
export function useResetPasswordService(): UseMutationResult<
  ResetPasswordResponse,
  Error,
  ResetPasswordSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ResetPasswordSchema) => {
      const res = await axios.patch<ResetPasswordResponse>(
        resetPasswordUrl,
        data,
        {
          withCredentials: true,
        }
      );
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
