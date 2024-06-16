import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option, OficialOption } from "../../types/option";
import { ApiGetOficial } from "../types/apiTypes";
import { SchemaOficial } from "../types/schema";

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
interface ApiResponse {
  oficial: ApiGetOficial[];
}

export function useOficial() {
  return useQuery<OficialOption[], Error>({
    queryKey: ["oficial"],
    queryFn: async (): Promise<OficialOption[]> => {
      try {
        const response = await axios.get<ApiResponse>(
          "http://localhost:5555/personal/oficial"
        );
        return response.data.oficial.map(
          (oficial) =>
            ({
              _id: oficial._id,
              dni: oficial.dni,
              firstname: oficial.firstname,
              lastname: oficial.lastname,
              legajo: oficial.legajo,
            } satisfies OficialOption)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    },
  });
}

export function useOfi(_id: string) {
  return useQuery({
    queryKey: ["oficial", { _id }],
    queryFn: async (): Promise<SchemaOficial> => {
      if (!_id) {
        throw new Error("Invalid ID: _id is undefined");
      }

      try {
        const { data } = await axios.get<ApiGetOficial>(
          `http://localhost:5555/personal/oficial/${_id}`
        );
        return {
          variant: "edit",
          _id: data._id,
          dni: data.dni,
          firstname: data.firstname,
          lastname: data.lastname,
          legajo: data.legajo,
        };
      } catch (error) {
        throw new Error(`Failed to fetch oficial data: ${error}`);
      }
    },
  });
}
