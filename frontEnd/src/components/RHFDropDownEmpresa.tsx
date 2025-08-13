import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { EmpresaOption } from "../types/option";

import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextFieldProps,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: EmpresaOption[];
  label: string;
  onAddNew?: () => void;
  helperText?: string;
} & TextFieldProps;

export function RHFDropDownEmpresa<T extends FieldValues>({
  name,
  options,
  label,
  onAddNew,
  helperText,
}: Props<T>) {
  const { control } = useFormContext<T>();
  const ADD_NEW_EMPRESA = "ADD_NEW_EMPRESA";

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ...restField },
        fieldState: { error },
      }) => (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth error={!!error}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              value={value || ""}
              label={label}
              onChange={(event) => {
                const selectedValue = event.target.value;
                if (selectedValue === ADD_NEW_EMPRESA) {
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
                  {option.empresa}
                </MenuItem>
              ))}
              {options && options.length > 0 && <Divider />}
              <MenuItem value={ADD_NEW_EMPRESA}>
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  No está en la lista? Agregar nueva...
                </ListItemText>
              </MenuItem>
            </Select>
            <FormHelperText>{error?.message || helperText}</FormHelperText>
          </FormControl>
        </Box>
      )}
    />
  );
}
