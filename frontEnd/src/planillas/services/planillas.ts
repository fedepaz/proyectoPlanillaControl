import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlanillaGet } from "../types/planillaType";
import { PlanillaSchema } from "../types/planillaSchema";
import apiClient from "../../services/csrfToken";

interface PaginatedResponse {
  data: PlanillaSchema[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

interface PlanillaFilters {
  page?: number;
  pageSize?: number;
  empresa?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  populate?: string[];
}

export function usePlanillas(filters: PlanillaFilters = {}) {
  const {
    page = 1,
    pageSize = 10,
    empresa,
    fechaDesde,
    fechaHasta,
    populate = [],
  } = filters;

  return useQuery<PaginatedResponse, Error>({
    queryKey: [
      "planillas",
      { page, pageSize, empresa, fechaDesde, fechaHasta, populate },
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });

      if (empresa) params.append("empresa", empresa);
      if (fechaDesde) params.append("fechaDesde", fechaDesde);
      if (fechaHasta) params.append("fechaHasta", fechaHasta);
      if (populate.length > 0) params.append("populate", populate.join(","));

      const { data } = await apiClient.get<PaginatedResponse>(
        `/planillas?${params.toString()}`
      );
      return data;
    },
  });
}

export function usePlanillaID(_id: string) {
  return useQuery({
    queryKey: ["planilla", _id],
    enabled: !!_id,
    queryFn: async (): Promise<PlanillaSchema> => {
      const { data } = await apiClient.get<PlanillaGet>(`/planillas/${_id}`);

      return {
        id: data.id,
        datosPsa: {
          fecha: data.datosPsa.fecha,
          responsable: data.datosPsa.responsable,
          horaIni: data.datosPsa.horaIni,
          horaFin: data.datosPsa.horaFin,
          cant: data.datosPsa.cant,
          tipoControl: Array.isArray(data.datosPsa.tipoControl)
            ? data.datosPsa.tipoControl
            : [data.datosPsa.tipoControl],
          medioTec: Array.isArray(data.datosPsa.medioTec)
            ? data.datosPsa.medioTec
            : [data.datosPsa.medioTec],
          tipoPro: Array.isArray(data.datosPsa.tipoPro)
            ? data.datosPsa.tipoPro
            : [data.datosPsa.tipoPro],
        },
        datosVuelo: {
          tipoVuelo: data.datosVuelo.tipoVuelo,
          empresa: data.datosVuelo.empresa,
          codVuelo: data.datosVuelo.codVuelo,
          horaArribo: data.datosVuelo.horaArribo || "",
          horaPartida: data.datosVuelo.horaPartida || "",
          demora: data.datosVuelo.demora,
          matriculaAeronave: data.datosVuelo.matriculaAeronave,
          posicion: data.datosVuelo.posicion,
        },
        datosTerrestre: Array.isArray(data.datosTerrestre)
          ? data.datosTerrestre.map((item) => ({
              personalEmpresa: item.personalEmpresa as string,
              funcion: item.funcion,
              grupo: item.grupo,
            }))
          : [],
        datosSeguridad: Array.isArray(data.datosSeguridad)
          ? data.datosSeguridad.map((item) => ({
              personalSegEmpresa: item.personalSegEmpresa,
              empresaSeguridad: item.empresaSeguridad,
            }))
          : [],
        datosVehiculos: Array.isArray(data.datosVehiculos)
          ? data.datosVehiculos.map((item) => ({
              vehiculo: item.vehiculo,
              operadorVehiculo: item.operadorVehiculo,
              isObservaciones: item.isObservaciones ?? false,
              observacionesVehiculo: item.observacionesVehiculo ?? "",
            }))
          : [],
        novEquipajes: data.novEquipajes,
        novInspeccion: data.novInspeccion,
        novOtras: data.novOtras,
      };
    },
  });
}

export function useCreatePlanilla() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PlanillaSchema) => {
      const response = await apiClient.post<PlanillaSchema>("/planillas", {
        datosPsa: {
          fecha: data.datosPsa.fecha,
          responsable: data.datosPsa.responsable,
          horaIni: data.datosPsa.horaIni,
          horaFin: data.datosPsa.horaFin,
          cant: data.datosPsa.cant,
          tipoControl: Array.isArray(data.datosPsa.tipoControl)
            ? data.datosPsa.tipoControl
            : [data.datosPsa.tipoControl],
          medioTec: Array.isArray(data.datosPsa.medioTec)
            ? data.datosPsa.medioTec
            : [data.datosPsa.medioTec],
          tipoPro: Array.isArray(data.datosPsa.tipoPro)
            ? data.datosPsa.tipoPro
            : [data.datosPsa.tipoPro],
        },
        datosVuelo: {
          tipoVuelo: data.datosVuelo.tipoVuelo,
          empresa: data.datosVuelo.empresa,
          codVuelo: data.datosVuelo.codVuelo,
          horaArribo: data.datosVuelo.horaArribo || "",
          horaPartida: data.datosVuelo.horaPartida || "",
          demora: data.datosVuelo.demora,
          matriculaAeronave: data.datosVuelo.matriculaAeronave,
          posicion: data.datosVuelo.posicion,
        },
        datosTerrestre: Array.isArray(data.datosTerrestre)
          ? data.datosTerrestre.map((item) => ({
              personalEmpresa: item.personalEmpresa as string,
              funcion: item.funcion,
              grupo: item.grupo,
            }))
          : [],
        datosSeguridad: Array.isArray(data.datosSeguridad)
          ? data.datosSeguridad.map((item) => ({
              personalSegEmpresa: item.personalSegEmpresa,
              empresaSeguridad: item.empresaSeguridad,
            }))
          : [],
        datosVehiculos: Array.isArray(data.datosVehiculos)
          ? data.datosVehiculos.map((item) => ({
              vehiculo: item.vehiculo,
              operadorVehiculo: item.operadorVehiculo,
              isObservaciones: item.isObservaciones ?? false,
              observacionesVehiculo: item.observacionesVehiculo ?? "",
            }))
          : [],
        novEquipajes: data.novEquipajes,
        novInspeccion: data.novInspeccion,
        novOtras: data.novOtras,
      });
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["planillas"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
