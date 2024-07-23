import { FormLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
        <>
          <FormLabel> {label}</FormLabel>
          <ToggleButtonGroup
            onChange={(_, newValue) => {
              if (newValue.length) {
                onChange(newValue);
              }
            }}
            value={value.length ? value : [options?.[0]._id]}
            {...restField}
          >
            {options?.map((option) => (
              <ToggleButton value={option._id} key={option._id}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </>
      )}
    ></Controller>
  );
}
