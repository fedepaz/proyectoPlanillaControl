import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlanillaSchema } from "../types/planillaSchema";
import apiClient from "../../services/csrfToken";

const API_URL = import.meta.env.VITE_API_URL;

export function useCreatePlanilla() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PlanillaSchema) => {
      const response = await apiClient.post(`${API_URL}/planillas`, data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["planillas"] });
    },
  });
}
