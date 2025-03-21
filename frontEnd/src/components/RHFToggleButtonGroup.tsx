import {
  FormLabel,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFToggleButtonGroup<T extends FieldValues>({
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
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <FormLabel> {label}</FormLabel>
          <ToggleButtonGroup
            size="small"
            orientation="vertical"
            onChange={(_, newValue) => {
              if (newValue.length) {
                onChange(newValue);
              }
            }}
            value={value.length ? value : [options?.[0].id]}
            {...restField}
          >
            {options?.map((option) => (
              <ToggleButton value={option.id} key={option.id}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      )}
    ></Controller>
  );
}
