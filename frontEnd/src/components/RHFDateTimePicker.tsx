import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";
import { TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label">;

export function RHFDateTimePicker<T extends FieldValues>({
  name,
  label,
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DateTimePicker
            label={label}
            {...field}
            views={["hours", "minutes"]}
            viewRenderers={{ year: null, month: null }}
            defaultValue={props}
          />
        </LocalizationProvider>
      )}
    />
  );
}
