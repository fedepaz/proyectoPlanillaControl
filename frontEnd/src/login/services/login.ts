import axios, { AxiosError } from "axios";

import { LoginSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL;
const loginUrl = `${API_URL}/session/login`;
interface LoginResponse {
  authenticated: boolean;
  message: string;
  user: {
    dni: string;
    oficialId: {
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
      id: string;
      currentAirportId: {
        aeropuerto: string;
        codIATA: string;
        codOACI: string;
        id: string;
      };
      jerarquiaId: {
        jerarquia: string;
        id: string;
      };
    };
    role: string;
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
      queryClient.removeQueries();
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      window.location.href = "/";
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
