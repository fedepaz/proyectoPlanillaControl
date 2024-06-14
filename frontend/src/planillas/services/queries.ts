import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../../types/option";

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

export function useOficial() {
  return useQuery({
    queryKey: ["oficial"],
    queryFn: (): Promise<Option[]> =>
      axios
        .get<{}>("http://localhost:5555/personal/oficial")
        .then((response) => response.data.map()),
  });
}
