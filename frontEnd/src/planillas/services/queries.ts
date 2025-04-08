import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  EmpresaOption,
  MatriculaOption,
  Option,
  PlanillaOption,
} from "../../types/option";
import {
  ApiGetEmpresa,
  ApiGetMatriculaAeronave,
  ApiGetOficial,
  ApiGetPersonalEmpresa,
  ApiGetPersonalSeguridad,
} from "../types/apiTypes";
import {
  EmpresaSchema,
  MatriculaAeronaveSchema,
  OficialSchema,
  PersonalEmpresaSchema,
  PersonalSeguridadSchema,
} from "../types/apiSchema";
import { PlanillaGet } from "../types/planillaType";
import { PlanillaSchema } from "../types/planillaSchema";
import apiClient from "../../services/csrfToken";

const API_URL = import.meta.env.VITE_API_URL;

interface PaginatedResponse {
  data: PlanillaOption[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
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
      console.log(tipoEmpresa);
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
    onError: (error) => {
      console.error("Failed to create oficial:", error);
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

      try {
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
      } catch (error) {
        throw new Error(`Failed to fetch oficial data: ${error}`);
      }
    },
    enabled: !!dni,
  });
}

export function usePlanillas(page: number = 1, pageSize: number = 10) {
  return useQuery<PaginatedResponse, Error>({
    queryKey: ["planillas", page, pageSize],
    queryFn: async (): Promise<PaginatedResponse> => {
      try {
        const response = await apiClient.get<PaginatedResponse>(
          `${API_URL}/planillas?page=${page}&pageSize=${pageSize}`
        );

        return {
          ...response.data,
          data: response.data.data.map((planilla) => ({
            id: planilla.id,
            datosPsa: {
              fecha: planilla.datosPsa.fecha,
              responsable: planilla.datosPsa.responsable,
              horaIni: planilla.datosPsa.horaIni,
              horaFin: planilla.datosPsa.horaFin,
              cant: planilla.datosPsa.cant,
              tipoControl: planilla.datosPsa.tipoControl,
              medioTec: planilla.datosPsa.medioTec,
              tipoPro: planilla.datosPsa.tipoPro,
            },
            datosVuelo: {
              aerolinea: planilla.datosVuelo.aerolinea,
              codVuelo: planilla.datosVuelo.codVuelo,
              origen: planilla.datosVuelo.origen,
              destino: planilla.datosVuelo.destino,
              horaArribo: planilla.datosVuelo.horaArribo,
              horaPartida: planilla.datosVuelo.horaPartida,
              demora: planilla.datosVuelo.demora,
              tipoVuelo: planilla.datosVuelo.tipoVuelo,
              matriculaAeronave: planilla.datosVuelo.matriculaAeronave,
              posicion: planilla.datosVuelo.posicion,
            },
            datosTerrestre: planilla.datosTerrestre.map((terrestre) => ({
              dniTerrestre: terrestre.dniTerrestre,
              apellidoTerrestre: terrestre.apellidoTerrestre,
              nombreTerrestre: terrestre.nombreTerrestre,
              legajoTerrestre: terrestre.legajoTerrestre,
              funcion: terrestre.funcion,
              grupo: terrestre.grupo,
            })),
            datosSeguridad: planilla.datosSeguridad.map((seguridad) => ({
              apellidoSeguridad: seguridad.apellidoSeguridad,
              nombreSeguridad: seguridad.nombreSeguridad,
              dniSeguridad: seguridad.dniSeguridad,
              legajoSeguridad: seguridad.legajoSeguridad,
              empresaSeguridad: seguridad.empresaSeguridad,
            })),
            datosVehiculos: planilla.datosVehiculos.map((vehiculo) => ({
              tipoVehiculo: vehiculo.tipoVehiculo,
              empresaVehiculo: vehiculo.empresaVehiculo,
              numInterno: vehiculo.numInterno,
              operadorVehiculo: vehiculo.operadorVehiculo,
              observacionesVehiculo: vehiculo.observacionesVehiculo,
            })),
            novEquipajes: planilla.novEquipajes,
            novInspeccion: planilla.novInspeccion,
            novOtras: planilla.novOtras,
          })),
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    },
  });
}

export function usePlanillaID(_id: string) {
  return useQuery({
    queryKey: ["planilla", { _id }],
    queryFn: async (): Promise<PlanillaSchema> => {
      if (!_id) {
        throw new Error("Invalid ID: _id is undefined");
      }

      try {
        const { data } = await apiClient.get<PlanillaGet>(
          `${API_URL}/planillas/${_id}`
        );
        return {
          id: data.id,
          datosPsa: {
            fecha: data.datosPsa.fecha,
            responsable: data.datosPsa.responsable,
            horaIni: data.datosPsa.horaIni,
            horaFin: data.datosPsa.horaFin,
            cant: data.datosPsa.cant,
            tipoControl: [data.datosPsa.tipoControl],
            medioTec: [data.datosPsa.medioTec],
            tipoPro: [data.datosPsa.tipoPro],
          },
          datosVuelo: {
            empresa: data.datosVuelo.empresa,
            codVuelo: data.datosVuelo.codVuelo,
            horaArribo: data.datosVuelo.horaArribo,
            horaPartida: data.datosVuelo.horaPartida,
            demora: data.datosVuelo.demora,
            tipoVuelo: data.datosVuelo.tipoVuelo,
            matriculaAeronave: data.datosVuelo.matriculaAeronave,
            posicion: data.datosVuelo.posicion,
          },
          datosTerrestre: data.datosTerrestre.map((terrestre) => ({
            personalEmpresa: terrestre.personalEmpresa,
            funcion: terrestre.funcion,
            grupo: terrestre.grupo,
          })),
          datosSeguridad: data.datosSeguridad.map((seguridad) => ({
            personalSegEmpresa: seguridad.personalSegEmpresa,
            empresaSeguridad: seguridad.empresaSeguridad,
          })),
          datosVehiculos: data.datosVehiculos.map((vehiculo) => ({
            vehiculo: vehiculo.vehiculo,
            operadorVehiculo: vehiculo.operadorVehiculo,
            observacionesVehiculo: vehiculo.observacionesVehiculo,
          })),
          novEquipajes: data.novEquipajes,
          novInspeccion: data.novInspeccion,
          novOtras: data.novOtras,
        };
      } catch (error) {
        throw new Error(`Failed to fetch oficial data: ${error}`);
      }
    },
    enabled: !!_id,
  });
}

export function createPersonalEmpresa() {}

export function usePersonalEmpresa(dni: number) {
  return useQuery({
    queryKey: ["personalEmpresa", { dni }],
    queryFn: async (): Promise<PersonalEmpresaSchema> => {
      if (!dni) {
        throw new Error("Invalid DNI: DNI is undefined");
      }

      try {
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
      } catch (error) {
        throw new Error(`Failed to fetch personal empresa data: ${error}`);
      }
    },
    enabled: !!dni,
  });
}

export function createPersonalEmpresaSeg() {}

export function usePersonalEmpresaSeg(dni: number) {
  return useQuery({
    queryKey: ["personalSeguridad", { dni }],
    queryFn: async (): Promise<PersonalSeguridadSchema> => {
      if (!dni) {
        throw new Error("Invalid DNI: DNI is undefined");
      }

      try {
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
      } catch (error) {
        throw new Error(`Failed to fetch personal seguridad data: ${error}`);
      }
    },
    enabled: !!dni,
  });
}

export function createMatricula() {}

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

      try {
        const { data } = await apiClient.get<ApiGetMatriculaAeronave>(
          `${API_URL}/aeronave/matricula/${matriculaAeronave}`
        );
        return {
          matriculaAeronave: data.matriculaAeronave,
          empresa: data.empresa,
        };
      } catch (error) {
        throw new Error(`Failed to fetch matricula data: ${error}`);
      }
    },
    enabled: !!matriculaAeronave,
  });
}

export function createEmpresa() {}

export function useEmpresa(tipoEmpresa?: string) {
  return useQuery({
    queryKey: ["empresa", tipoEmpresa],
    queryFn: async () => {
      const response = await apiClient.get<EmpresaOption[]>(
        `${API_URL}/empresa`
      );
      const empresaRes = response.data;
      console.log(empresaRes);
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
      console.log(empresaRes);
      return empresaRes;
    },
    enabled: !!tipoEmpresaId, // Only run query when we have a tipoEmpresaId
  });
};

export function useEmpresaId(empresa: string) {
  return useQuery({
    queryKey: ["empresa", { empresa }],
    queryFn: async (): Promise<EmpresaSchema> => {
      if (!empresa) {
        throw new Error("Invalid Empresa: Empresa is undefined");
      }

      try {
        const { data } = await apiClient.get<ApiGetEmpresa>(
          `${API_URL}/aeronave/empresa/${empresa}`
        );
        return {
          empresa: data.empresa,
          tipoEmpresa: data.tipoEmpresa,
        };
      } catch (error) {
        throw new Error(`Failed to fetch matricula data: ${error}`);
      }
    },
    enabled: !!empresa,
  });
}
