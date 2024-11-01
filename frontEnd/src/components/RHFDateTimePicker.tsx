import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";
import { TextFieldProps } from "@mui/material";
import { addMinutes, isBefore } from "date-fns";

type Props<T extends FieldValues> = {
  name: Path<T>;
  isEndTime?: boolean;
} & Pick<TextFieldProps, "label">;

export function RHFDateTimePicker<T extends FieldValues>({
  name,
  label,
  isEndTime = false,
}: Props<T>) {
  const { control, watch } = useFormContext<T>();
  const startTimePath = name.includes("horaFin")
    ? ("datosPsa.horaIni" as Path<T>)
    : null;
  const startTime = startTimePath
    ? (watch(startTimePath) as string | undefined)
    : undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => {
        const now = new Date();
        const minTime = isEndTime && startTime ? new Date(startTime) : now;

        return (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DateTimePicker
              label={label}
              {...field}
              value={value ? new Date(value) : null}
              onChange={(newValue) => {
                if (newValue) {
                  if (!isEndTime && isBefore(newValue, now)) {
                    onChange(now.toISOString());
                    return;
                  }

                  if (
                    isEndTime &&
                    startTime &&
                    isBefore(newValue, new Date(startTime))
                  ) {
                    onChange(addMinutes(new Date(startTime), 1).toISOString());
                    return;
                  }

                  onChange(newValue.toISOString());
                } else {
                  onChange(null);
                }
              }}
              minDateTime={minTime}
              views={["hours", "minutes"]}
              ampm={false}
              slotProps={{
                textField: {
                  error: false,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}
