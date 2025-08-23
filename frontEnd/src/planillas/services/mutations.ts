import { useMutation, useQueryClient } from "@tanstack/react-query";
import authClient from "../../services/authClient";

import {
  AeropuertosSchema,
  CodVueloSchema,
  EmpresaSchema,
  MatriculaAeronaveSchema,
  PersonalEmpresaSchema,
  VehiculosSchema,
} from "../types/apiSchema";

export function useCreateEmpresa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EmpresaSchema) => {
      const response = await authClient.post(`/empresa`, data);
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
      const response = await authClient.post(`/aeropuerto`, data);
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
      const response = await authClient.post(`/codVuelo`, data);
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
      const response = await authClient.post(`/aeronave`, data);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["matricula"] });
    },
  });
}

export function useCreatePersonalEmpresa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PersonalEmpresaSchema) => {
      const response = await authClient.post(`/personalEmpresa`, data);
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
      const response = await authClient.post(`/personalSeguridad`, data);
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

export function useCreateVehiculo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: VehiculosSchema) => {
      const response = await authClient.post(`/vehiculos`, data);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vehiculos"] });
    },
  });
}
