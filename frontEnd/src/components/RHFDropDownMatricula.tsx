import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { MatriculaOption } from "../types/option";

import {
  Box,
  Divider,
  FormControl,
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
  options?: MatriculaOption[];
  label: string;
  onAddNew?: () => void;
} & TextFieldProps;

export function RHFDropDownMatricula<T extends FieldValues>({
  name,
  options,
  label,
  onAddNew,
}: Props<T>) {
  const { control } = useFormContext<T>();
  const ADD_NEW_MATRICULA = "ADD_NEW_MATRICULA";

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
                if (selectedValue === ADD_NEW_MATRICULA) {
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
                  {option.matriculaAeronave}
                </MenuItem>
              ))}
              {options && options.length > 0 && <Divider />}
              <MenuItem value={ADD_NEW_MATRICULA}>
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  No está en la lista? Agregar nueva...
                </ListItemText>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    />
  );
}
