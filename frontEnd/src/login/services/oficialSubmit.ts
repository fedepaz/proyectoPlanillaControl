import axios, { AxiosError } from "axios";

import { OficialSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL;

const loginUrl = "/oficial";

interface OficialResponse {
  dni: string;
  firstname: string;
  lastname: string;
  legajo: number;
}

export function useOficialSubmit(): UseMutationResult<
  OficialResponse,
  Error,
  OficialSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: OficialSchema) => {
      const res = await axios.post<OficialResponse>(
        `${API_URL}${loginUrl}`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [""] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error
          : "Ocurrió un error inesperado";
      return errorMessage;
    },
  });
}
