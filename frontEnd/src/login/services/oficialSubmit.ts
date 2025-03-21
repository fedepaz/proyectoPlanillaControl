import axios, { AxiosError } from "axios";

import { OficialSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const loginUrl = "http://localhost:5555/oficial";

interface OficialResponse {
  dni: string;
  id: string;
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
      const res = await axios.post<OficialResponse>(loginUrl, data, {
        withCredentials: true,
      });
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
