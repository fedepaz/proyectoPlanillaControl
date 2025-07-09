import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AeropuertoOption,
  CodVueloOption,
  EmpresaOption,
  JerarquiaOption,
  MatriculaOption,
  Option,
  PersonalEmpresaOption,
  PersonalSeguridadOption,
  UnidadOption,
  VehiculoOption,
} from "../../types/option";
import {
  ApiGetMatriculaAeronave,
  ApiGetOficial,
  ApiGetPersonalEmpresa,
  ApiGetPersonalSeguridad,
} from "../types/apiTypes";
import {
  MatriculaAeronaveSchema,
  OficialSchema,
  PersonalEmpresaSchema,
  PersonalSeguridadSchema,
} from "../types/apiSchema";
import apiClient from "../../services/csrfToken";

const API_URL = import.meta.env.VITE_API_URL;

interface CreateOficialResponse {
  _id: string;
  dni: number;
  firstname: string;
  lastname: string;
  legajo: number;
  id: string;
}

export function useCreateOficial() {
  const queryClient = useQueryClient();

  return useMutation<CreateOficialResponse, Error, OficialSchema>({
    mutationFn: async (newOficial: OficialSchema) => {
      const { data } = await apiClient.post<CreateOficialResponse>(
        `${API_URL}/oficial`,
        newOficial
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["oficial", { _id: data._id }], data);
    },
  });
}

export function useOficial(dni: string) {
  return useQuery({
    queryKey: ["oficial", { dni }],
    queryFn: async (): Promise<OficialSchema> => {
      if (!dni) {
        throw new Error("Invalid DNI: DNI is undefined");
      }

      const { data } = await apiClient.get<ApiGetOficial>(
        `${API_URL}/oficial/dni/${dni}`
      );
      return {
        dni: data.dni,
        firstname: data.firstname,
        lastname: data.lastname,
        legajo: data.legajo,
        id: data.id,
      };
    },
    enabled: !!dni,
  });
}

export function useTipoControl() {
  return useQuery({
    queryKey: ["tipoControl"],
    queryFn: async () => {
      const response = await apiClient.get<Option[]>(
        `${API_URL}/data/tipoControl`
      );
      const tipoControl = response.data;
      return tipoControl;
    },
  });
}
export function useTipoEmpresa() {
  return useQuery({
    queryKey: ["tipoEmpresa"],
    queryFn: async () => {
      const response = await apiClient.get<Option[]>(
        `${API_URL}/data/tipoEmpresa`
      );
      const tipoEmpresa = response.data;
      return tipoEmpresa;
    },
  });
}

export function useMediosTec() {
  return useQuery({
    queryKey: ["mediosTec"],
    queryFn: async () => {
      const response = await apiClient.get<Option[]>(
        `${API_URL}/data/mediosTec`
      );
      const mediosTec = response.data;
      return mediosTec;
    },
  });
}

export function useTipoPro() {
  return useQuery({
    queryKey: ["tipoPro"],
    queryFn: async () => {
      const response = await apiClient.get<Option[]>(`${API_URL}/data/tipoPro`);
      const tipoPro = response.data;
      return tipoPro;
    },
  });
}

export function useDemora() {
  return useQuery({
    queryKey: ["demora"],
    queryFn: async () => {
      const response = await apiClient.get<Option[]>(`${API_URL}/data/demora`);
      const demora = response.data;
      return demora;
    },
  });
}

export function useTipoVuelo() {
  return useQuery({
    queryKey: ["tipoVuelo"],
    queryFn: async () => {
      const response = await apiClient.get<Option[]>(
        `${API_URL}/data/tipoVuelo`
      );
      const tipoVuelo = response.data;
      return tipoVuelo;
    },
  });
}

export function useFuncion() {
  return useQuery({
    queryKey: ["funcion"],
    queryFn: async () => {
      const response = await apiClient.get<Option[]>(`${API_URL}/data/funcion`);
      const funcion = response.data;
      return funcion;
    },
  });
}

export function useTipoVehiculo() {
  return useQuery({
    queryKey: ["tipoVehiculo"],
    queryFn: async () => {
      const response = await apiClient.get<Option[]>(
        `${API_URL}/data/tipoVehiculo`
      );
      const tipoVehiculo = response.data;
      return tipoVehiculo;
    },
  });
}

export function usePersonalEmpresa(dni: number) {
  return useQuery({
    queryKey: ["personalEmpresa", { dni }],
    queryFn: async (): Promise<PersonalEmpresaSchema> => {
      if (!dni) {
        throw new Error("Invalid DNI: DNI is undefined");
      }

      const { data } = await apiClient.get<ApiGetPersonalEmpresa>(
        `${API_URL}/personalEmpresa/dni/${dni}`
      );
      return {
        dni: data.dni,
        firstname: data.firstname,
        lastname: data.lastname,
        empresa: data.empresa,
        legajo: data.legajo,
      };
    },
    enabled: !!dni,
  });
}

type BuscarPersonalParams = {
  dni: string;
  empresa: string;
};

export function usePersonalEmpresaBusqueda(
  params: BuscarPersonalParams | null
) {
  return useQuery({
    queryKey: ["personalEmpresa", params],
    queryFn: async () => {
      if (!params) return null;
      const response = await apiClient.post<PersonalEmpresaOption | null>(
        `${API_URL}/personalEmpresa/busqueda`,
        params
      );
      const personalEmpresa = response.data;
      return personalEmpresa;
    },
    enabled: !!params,
    retry: false,
  });
}

export function usePersonalEmpresaSeg(dni: number) {
  return useQuery({
    queryKey: ["personalSeguridad", { dni }],
    queryFn: async (): Promise<PersonalSeguridadSchema> => {
      if (!dni) {
        throw new Error("Invalid DNI: DNI is undefined");
      }

      const { data } = await apiClient.get<ApiGetPersonalSeguridad>(
        `${API_URL}/personalSeguridad/dni/${dni}`
      );
      return {
        dni: data.dni,
        firstname: data.firstname,
        lastname: data.lastname,
        empresa: data.empresa,
        legajo: data.legajo,
      };
    },
    enabled: !!dni,
  });
}
export function usePersonalSeguridadBusqueda(
  params: BuscarPersonalParams | null
) {
  return useQuery({
    queryKey: ["personalSeguridad", params],
    queryFn: async () => {
      if (!params) return null;
      const response = await apiClient.post<PersonalSeguridadOption | null>(
        `${API_URL}/personalSeguridad/busqueda`,
        params
      );
      const personalSeguridad = response.data;
      return personalSeguridad;
    },
    enabled: !!params,
    retry: false,
  });
}

export function useMatricula(empresa?: string) {
  return useQuery({
    queryKey: ["matriculaAeronave", empresa],
    queryFn: async () => {
      const response = await apiClient.get<{
        matriculaAeronave: MatriculaOption[];
      }>(`${API_URL}/aeronave`);
      const matriculaAeronaveRes = response.data;

      return matriculaAeronaveRes;
    },
  });
}

export function useMatriculaId(matriculaAeronave: string) {
  return useQuery({
    queryKey: ["matriculaAeronave", { matriculaAeronave }],
    queryFn: async (): Promise<MatriculaAeronaveSchema> => {
      if (!matriculaAeronave) {
        throw new Error("Invalid Matricula: Matricula is undefined");
      }

      const { data } = await apiClient.get<ApiGetMatriculaAeronave>(
        `${API_URL}/aeronave/matricula/${matriculaAeronave}`
      );
      return {
        matriculaAeronave: data.matriculaAeronave,
        empresa: data.empresa,
      };
    },
    enabled: !!matriculaAeronave,
  });
}

type BuscarMatriculaParams = {
  empresa: string;
};

export function useMatriculaBusqueda(params: BuscarMatriculaParams | null) {
  return useQuery({
    queryKey: ["matricula", params],
    queryFn: async () => {
      if (!params) return [];
      const response = await apiClient.post<MatriculaOption[]>(
        `${API_URL}/aeronave/busqueda`,
        params
      );
      const matricula = response.data;
      return matricula;
    },
    enabled: !!params,
  });
}

export function useEmpresa(tipoEmpresa?: string) {
  return useQuery({
    queryKey: ["empresa", tipoEmpresa],
    queryFn: async () => {
      const response = await apiClient.get<EmpresaOption[]>(
        `${API_URL}/empresa`
      );
      const empresaRes = response.data;
      return empresaRes;
    },
  });
}

export const useEmpresaTipoId = (tipoEmpresaId: string) => {
  return useQuery({
    queryKey: ["empresa", tipoEmpresaId],
    queryFn: async () => {
      const response = await apiClient.get<EmpresaOption[]>(
        `${API_URL}/empresa/tipoID/${tipoEmpresaId}`
      );
      const empresaRes = response.data;
      return empresaRes;
    },
    enabled: !!tipoEmpresaId,
  });
};

export function useEmpresaId(empresaId: string) {
  return useQuery({
    queryKey: ["empresa", empresaId],
    queryFn: async () => {
      const response = await apiClient.get<EmpresaOption>(
        `${API_URL}/empresa/${empresaId}`
      );
      const empresa = response.data;
      return empresa;
    },
    enabled: !!empresaId,
  });
}

export function useJerarquia() {
  return useQuery({
    queryKey: ["jerarquias"],
    queryFn: async () => {
      const response = await apiClient.get<JerarquiaOption[]>(
        `${API_URL}/session/jerarquias`
      );
      const jerarquias = response.data;
      return jerarquias;
    },
  });
}

export function useUnidad() {
  return useQuery({
    queryKey: ["unidad"],
    queryFn: async () => {
      const response = await apiClient.get<UnidadOption[]>(
        `${API_URL}/session/unidad`
      );
      const unidades = response.data;
      return unidades;
    },
  });
}

export function useAeropuertos() {
  return useQuery({
    queryKey: ["aeropuertos"],
    queryFn: async () => {
      const response = await apiClient.get<AeropuertoOption[]>(
        `${API_URL}/aeropuerto`
      );
      const aeropuertos = response.data;
      return aeropuertos;
    },
  });
}

export function useCodVuelo() {
  return useQuery({
    queryKey: ["codVuelo"],
    queryFn: async () => {
      const response = await apiClient.get<CodVueloOption[]>(
        `${API_URL}/codVuelo`
      );
      const codVuelo = response.data;
      return codVuelo;
    },
  });
}

type BuscarCodVueloParams = {
  origen: string;
  destino: string;
  empresa: string;
};

export function useCodVueloBusqueda(params: BuscarCodVueloParams | null) {
  return useQuery({
    queryKey: ["codVuelo", params],
    queryFn: async () => {
      if (!params) return [];
      const response = await apiClient.post<CodVueloOption[]>(
        `${API_URL}/codVuelo/busqueda`,
        params
      );
      const codVuelo = response.data;
      return codVuelo;
    },
    enabled: !!params,
  });
}

export function usePersonalHandlingEmpresa(id: string) {
  return useQuery({
    queryKey: ["personalHandling", id],
    queryFn: async () => {
      const response = await apiClient.get<PersonalEmpresaOption>(
        `${API_URL}/personalEmpresa/${id}`
      );
      const empresaHandling = response.data;
      return empresaHandling;
    },
    enabled: !!id,
  });
}
export type BuscarVehiculosParams = {
  empresa: string;
  numInterno: string;
};

export function useVehiculoBusqueda(params: BuscarVehiculosParams | null) {
  return useQuery({
    queryKey: ["vehiculo", params],
    queryFn: async () => {
      if (!params) return null;
      const response = await apiClient.post<VehiculoOption>(
        `${API_URL}/vehiculos/busqueda`,
        params
      );
      const vehiculo = response.data;
      return vehiculo;
    },
    enabled: !!params,
  });
}
