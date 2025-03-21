import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { MatriculaOption } from "../types/option";
import {
  TextFieldProps,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: MatriculaOption[];
  label: string;
} & TextFieldProps;

export function RHFDropDownMatricula<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

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
                onChange(event.target.value);
              }}
              {...restField}
            >
              {options?.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.matriculaAeronave}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    />
  );
}
