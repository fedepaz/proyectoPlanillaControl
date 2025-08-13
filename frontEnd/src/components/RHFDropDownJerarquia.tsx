import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { JerarquiaOption } from "../types/option";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextFieldProps,
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
  margin = "normal",
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <Box
          sx={{
            width: "100%",
            mt: margin === "normal" ? 2 : 1,
            mb: margin === "normal" ? 1 : 0,
          }}
        >
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
                  Oficial {formatHierarchyName(option.label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    />
  );
}
