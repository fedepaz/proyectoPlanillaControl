import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import { FormHelperText } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
  helperText?: string;
};

export function RHFRadioGroup<T extends FieldValues>({
  name,
  options,
  label,
  helperText,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            {...field}
            row
            value={field.value || ""}
            onChange={(event) => {
              field.onChange(event.target.value);
            }}
          >
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{error?.message || helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
