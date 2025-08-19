import axios, { AxiosError } from "axios";

import { LoginSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { LoginResponse } from "../../types/auth";
import { sessionBackup } from "../../services/sessionBackup";

const API_URL = import.meta.env.VITE_API_URL;
const loginUrl = `${API_URL}/session/login`;

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

      if (res.data.authenticated) {
        sessionBackup.save(res.data);
      }

      return res.data;
    },
    onSuccess: async () => {
      queryClient.removeQueries();
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      window.location.href = "/";
    },
    onError: (error) => {
      sessionBackup.clear();
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Ocurrió un error inesperado";
      return error;
    },
  });
}
