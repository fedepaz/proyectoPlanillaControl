import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  valueAsNumber?: boolean;
  helperText?: string;
} & TextFieldProps;

export function RHFTextField<T extends FieldValues>({
  name,
  valueAsNumber,
  helperText,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          value={field.value ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(valueAsNumber ? Number(value) : value);
          }}
          error={!!error}
          helperText={error?.message || helperText}
        />
      )}
    />
  );
}
