import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { MatriculaOption } from "../types/option";

import { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

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
