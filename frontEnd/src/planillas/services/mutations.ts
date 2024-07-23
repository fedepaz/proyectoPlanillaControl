import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "../types/planillaSchema";
import axios from "axios";

export function useCreateOficial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.post("http://localhost:5555/data/"), data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [""] });
    },
  });
}
