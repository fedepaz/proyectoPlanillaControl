import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Option, PlanillaOption } from "../../types/option";
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
import { PlanillaGet } from "../types/planillaType";
import { PlanillaSchema } from "../types/planillaSchema";

export function useTipoControl() {
  return useQuery({
    queryKey: ["tipoControl"],
    queryFn: async () => {
      const response = await axios.get<{ tipoControl: Option[] }>(
        "http://localhost:5555/data/tipoControl"
      );
      const { tipoControl } = response.data;
      return tipoControl;
    },
  });
}

export function useMediosTec() {
  return useQuery({
    queryKey: ["mediosTec"],
    queryFn: async () => {
      const response = await axios.get<{ mediosTec: Option[] }>(
        "http://localhost:5555/data/mediosTec"
      );
      const { mediosTec } = response.data;
      return mediosTec;
    },
  });
}

export function useTipoPro() {
  return useQuery({
    queryKey: ["tipoPro"],
    queryFn: async () => {
      const response = await axios.get<{ tipoPro: Option[] }>(
        "http://localhost:5555/data/tipoPro"
      );
      const { tipoPro } = response.data;
      return tipoPro;
    },
  });
}

export function useDemora() {
  return useQuery({
    queryKey: ["demora"],
    queryFn: async () => {
      const response = await axios.get<{ demora: Option[] }>(
        "http://localhost:5555/data/demora"
      );
      const { demora } = response.data;
      return demora;
    },
  });
}

export function useTipoVuelo() {
  return useQuery({
    queryKey: ["tipoVuelo"],
    queryFn: async () => {
      const response = await axios.get<{ tipoVuelo: Option[] }>(
        "http://localhost:5555/data/tipoVuelo"
      );
      const { tipoVuelo } = response.data;
      return tipoVuelo;
    },
  });
}

export function useFuncion() {
  return useQuery({
    queryKey: ["funcion"],
    queryFn: async () => {
      const response = await axios.get<{ funcion: Option[] }>(
        "http://localhost:5555/data/funcion"
      );
      const { funcion } = response.data;
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
}

export function useCreateOficial() {
  const queryClient = useQueryClient();

  return useMutation<CreateOficialResponse, Error, OficialSchema>({
    mutationFn: async (newOficial: OficialSchema) => {
      const { data } = await axios.post<CreateOficialResponse>(
        "http://localhost:5555/oficial",
        newOficial
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["oficial"]);

      queryClient.setQueryData(["oficial", { _id: data._id }], data);
    },
    onError: (error) => {
      console.error("Failed to create oficial:", error);
    },
  });
}

export function useOficial(dni: number) {
  return useQuery({
    queryKey: ["oficial", { dni }],
    queryFn: async (): Promise<OficialSchema> => {
      if (!dni) {
        throw new Error("Invalid DNI: DNI is undefined");
      }

      try {
        const { data } = await axios.get<ApiGetOficial>(
          `http://localhost:5555/oficial/dni/${dni}`
        );
        return {
          dni: data.dni,
          firstname: data.firstname,
          lastname: data.lastname,
          legajo: data.legajo,
        };
      } catch (error) {
        throw new Error(`Failed to fetch oficial data: ${error}`);
      }
    },
    enabled: !!dni,
  });
}

interface ApiResponsePlanilla {
  planilla: PlanillaGet[];
}

export function usePlanillas() {
  return useQuery<PlanillaOption[], Error>({
    queryKey: ["planillas"],
    queryFn: async (): Promise<PlanillaOption[]> => {
      try {
        const response = await axios.get<ApiResponsePlanilla>(
          "http://localhost:5555/planillas"
        );
        return response.data.planilla.map(
          (planilla) =>
            ({
              _id: planilla._id,
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
            } satisfies PlanillaOption)
        );
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
        const { data } = await axios.get<PlanillaGet>(
          `http://localhost:5555/planillas/${_id}`
        );
        return {
          _id: data._id,
          datosPsa: {
            fecha: data.datosPsa.fecha,
            responsable: data.datosPsa.responsable,
            horaIni: data.datosPsa.horaIni,
            horaFin: data.datosPsa.horaFin,
            cant: data.datosPsa.cant,
            tipoControl: data.datosPsa.tipoControl,
            medioTec: data.datosPsa.medioTec,
            tipoPro: data.datosPsa.tipoPro,
          },
          datosVuelo: {
            aerolinea: data.datosVuelo.aerolinea,
            codVuelo: data.datosVuelo.codVuelo,
            origen: data.datosVuelo.origen,
            destino: data.datosVuelo.destino,
            horaArribo: data.datosVuelo.horaArribo,
            horaPartida: data.datosVuelo.horaPartida,
            demora: data.datosVuelo.demora,
            tipoVuelo: data.datosVuelo.tipoVuelo,
            matriculaAeronave: data.datosVuelo.matriculaAeronave,
            posicion: data.datosVuelo.posicion,
          },
          datosTerrestre: data.datosTerrestre.map((terrestre) => ({
            dniTerrestre: terrestre.dniTerrestre,
            apellidoTerrestre: terrestre.apellidoTerrestre,
            nombreTerrestre: terrestre.nombreTerrestre,
            legajoTerrestre: terrestre.legajoTerrestre,
            funcion: terrestre.funcion,
            grupo: terrestre.grupo,
          })),
          datosSeguridad: data.datosSeguridad.map((seguridad) => ({
            apellidoSeguridad: seguridad.apellidoSeguridad,
            nombreSeguridad: seguridad.nombreSeguridad,
            dniSeguridad: seguridad.dniSeguridad,
            legajoSeguridad: seguridad.legajoSeguridad,
            empresaSeguridad: seguridad.empresaSeguridad,
          })),
          datosVehiculos: data.datosVehiculos.map((vehiculo) => ({
            tipoVehiculo: vehiculo.tipoVehiculo,
            empresaVehiculo: vehiculo.empresaVehiculo,
            numInterno: vehiculo.numInterno,
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
        const { data } = await axios.get<ApiGetPersonalEmpresa>(
          `http://localhost:5555/personalEmpresa/dni/${dni}`
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
        const { data } = await axios.get<ApiGetPersonalSeguridad>(
          `http://localhost:5555/personalSeguridad/dni/${dni}`
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

export function useMatricula(matriculaAeronave: string) {
  return useQuery({
    queryKey: ["matriculaAeronave", { matriculaAeronave }],
    queryFn: async (): Promise<MatriculaAeronaveSchema> => {
      if (!matriculaAeronave) {
        throw new Error("Invalid DNI: DNI is undefined");
      }

      try {
        const { data } = await axios.get<ApiGetMatriculaAeronave>(
          `http://localhost:5555/aeronave/matricula/${matriculaAeronave}`
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
