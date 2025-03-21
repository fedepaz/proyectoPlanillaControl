import axios, { AxiosError } from "axios";

import { RegisterSchema } from "../types/modelsSchema";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const registerUrl = "http://localhost:5555/session/register";
interface RegisterResponse {
  success: boolean;
  message: string;
}

export function useRegister(): UseMutationResult<
  RegisterResponse,
  Error,
  RegisterSchema,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      console.log("Sending registration data:", data);
      try {
        const res = await axios.post<RegisterResponse>(registerUrl, data, {
          withCredentials: true,
        });
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
      console.log(errorMessage);
      return errorMessage;
    },
  });
}
