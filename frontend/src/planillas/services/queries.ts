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
