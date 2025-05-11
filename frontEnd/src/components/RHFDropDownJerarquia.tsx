import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { JerarquiaOption } from "../types/option";
import {
  TextFieldProps,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { formatHierarchyName } from "../utils/formatUtils";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: JerarquiaOption[];
  label: string;
} & TextFieldProps;

export function RHFDropDownJerarquia<T extends FieldValues>({
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
                Oficial {option.jerarquia}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
