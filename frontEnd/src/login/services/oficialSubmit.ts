import axios from "axios";

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
      const res = await axios.post<OficialResponse>(loginUrl, data);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [""] });
    },
    onError: (error) => {
      return error;
    },
  });
}
