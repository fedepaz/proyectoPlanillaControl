import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function RHFDateTimePicker<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DateTimePicker label={label} {...field} />
        </LocalizationProvider>
      )}
    />
  );
}
