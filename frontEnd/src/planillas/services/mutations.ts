import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlanillaSchema } from "../types/planillaSchema";
import axios from "axios";

export function useCreatePlanilla() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PlanillaSchema) => {
      await axios.post("http://localhost:5555/planillas/"), data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [""] });
    },
  });
}
