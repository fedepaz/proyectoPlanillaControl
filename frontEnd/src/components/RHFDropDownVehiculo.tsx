import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { VehiculoOption } from "../types/option";

import { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";

import AddIcon from "@mui/icons-material/Add";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import AirportShuttle from "@mui/icons-material/AirportShuttle";
import SwapHoriz from "@mui/icons-material/SwapHoriz";
import Agriculture from "@mui/icons-material/Agriculture";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: VehiculoOption[];
  label: string;
  onAddNew?: () => void;
} & TextFieldProps;

export function RHFDropDownVehiculo<T extends FieldValues>({
  name,
  options,
  label,
  onAddNew,
}: Props<T>) {
  const { control } = useFormContext<T>();
  const ADD_NEW_VEHICULO = "ADD_NEW_VEHICULO";
  const theme = useTheme();

  const getVehiculoIcon = (tipoVehiculo: string) => {
    switch (tipoVehiculo) {
      case "carrito":
        return {
          label: "Carrito",
          icon: <AirportShuttle />,
          color: theme.palette.warning.main,
        };

      case "cinta":
        return {
          label: "Cinta",
          icon: <SwapHoriz />,
          color: theme.palette.warning.main,
        };
      case "tractor":
        return {
          label: "Tractor",
          icon: <Agriculture />,
          color: theme.palette.warning.main,
        };
      default:
        return {
          label: tipoVehiculo || "Vehículo",
          icon: <DirectionsCar />, // Generic car icon
          color: theme.palette.grey[600],
        };
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              value={value || ""}
              label={label}
              onChange={(event) => {
                const selectedValue = event.target.value;
                if (selectedValue === ADD_NEW_VEHICULO) {
                  if (onAddNew) {
                    onAddNew();
                  }
                } else {
                  onChange(selectedValue);
                }
              }}
              {...restField}
            >
              {options?.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  <ListItemIcon>
                    {getVehiculoIcon(option.tipoVehiculo.label).icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={option.numInterno}
                    secondary={getVehiculoIcon(option.tipoVehiculo.label).label}
                  />
                </MenuItem>
              ))}
              <Divider />
              <MenuItem value={ADD_NEW_VEHICULO}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Añadir nuevo vehículo" />
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    />
  );
}
