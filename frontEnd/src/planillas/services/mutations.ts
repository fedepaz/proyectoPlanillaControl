import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/csrfToken";
import { PlanillaSchema } from "../types/planillaSchema";
import {
  AeropuertosSchema,
  CodVueloSchema,
  EmpresaSchema,
  MatriculaAeronaveSchema,
  PersonalEmpresaSchema,
} from "../types/apiSchema";

export function useCreatePlanilla() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PlanillaSchema) => {
      const response = await apiClient.post(`/planillas`, data);
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

export function useCreateCodVuelo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CodVueloSchema) => {
      const response = await apiClient.post(`/codVuelo`, data);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["codVuelo"] });
    },
  });
}

export function useCreateMatricula() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MatriculaAeronaveSchema) => {
      const response = await apiClient.post(`/aeronave`, data);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["matriculaAeronave"] });
    },
  });
}

export function useCreatePersonalEmpresa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PersonalEmpresaSchema) => {
      const response = await apiClient.post(`/personalEmpresa`, data);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["personalEmpresa"],
      });
    },
  });
}

export function useCreatePersonalSeguridad() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PersonalEmpresaSchema) => {
      const response = await apiClient.post(`/personalSeguridad`, data);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["personalSeguridad"],
      });
    },
  });
}
