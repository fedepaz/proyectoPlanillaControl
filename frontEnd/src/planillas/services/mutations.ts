import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/csrfToken";
import { PlanillaSchema } from "../types/planillaSchema";
import { AeropuertosSchema, EmpresaSchema } from "../types/apiSchema";

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

export function useCreateEmpresa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EmpresaSchema) => {
      const response = await apiClient.post(`/empresa`, data);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["empresa"] });
    },
  });
}

export function useCreateAeropuerto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AeropuertosSchema) => {
      const response = await apiClient.post(`/aeropuerto`, data);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["aeropuertos"] });
    },
  });
}
