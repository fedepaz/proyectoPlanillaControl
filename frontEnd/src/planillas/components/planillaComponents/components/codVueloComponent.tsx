import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { PlanillaSchema } from "../../../types/planillaSchema";
import { useEffect, useState } from "react";

// Interface for flight code suggestion
interface VueloSugerido {
  codigo: string;
  aerolinea: string;
  origen: string;
  destino: string;
}

export function CodVueloComponent() {
  const { setValue, watch } = useFormContext<PlanillaSchema>();

  // Watch for changes to key fields
  const tipoVuelo = watch("datosVuelo.tipoVuelo");
  const aerolinea = watch("datosVuelo.empresa");
  const origen = watch("datosVuelo.codVuelo");
  const destino = watch("datosVuelo.destino");

  // State for flight code suggestions
  const [vuelosSugeridos, setVuelosSugeridos] = useState<VueloSugerido[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Generate flight code suggestions when relevant fields change
  useEffect(() => {
    if (
      aerolinea &&
      ((tipoVuelo === "ARRIBO" && origen) ||
        (tipoVuelo === "PARTIDA" && destino))
    ) {
      // This would typically come from an API, but we're simulating it here
      // In a real app, you'd fetch this data based on the selected values
      const codigoBase = aerolinea.substring(0, 2).toUpperCase();

      const sugerencias: VueloSugerido[] = [
        {
          codigo: `${codigoBase}123`,
          aerolinea: aerolinea,
          origen: origen || "---",
          destino: destino || "---",
        },
        {
          codigo: `${codigoBase}456`,
          aerolinea: aerolinea,
          origen: origen || "---",
          destino: destino || "---",
        },
        {
          codigo: `${codigoBase}789`,
          aerolinea: aerolinea,
          origen: origen || "---",
          destino: destino || "---",
        },
      ];
      setVuelosSugeridos(sugerencias);
    } else {
      setVuelosSugeridos([]);
    }
  }, [aerolinea, tipoVuelo, origen, destino]);

  return (
    <Autocomplete
      freeSolo
      options={vuelosSugeridos}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.codigo
      }
      inputValue={inputValue}
      onInputChange={(_, newValue) => {
        setInputValue(newValue);
      }}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          setValue("datosVuelo.codVuelo", newValue);
        } else if (newValue) {
          setValue("datosVuelo.codVuelo", newValue.codigo);
        } else {
          setValue("datosVuelo.codVuelo", "");
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Código de vuelo"
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Box>
            <Typography variant="body1">{option.codigo}</Typography>
            <Typography variant="caption" color="text.secondary">
              {option.origen} → {option.destino}
            </Typography>
          </Box>
        </li>
      )}
    />
  );
}
