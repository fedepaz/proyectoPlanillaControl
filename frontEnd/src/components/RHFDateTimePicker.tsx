import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";
import { addMinutes, format, isBefore, parse, subHours } from "date-fns";
import { TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  isEndTime?: boolean;
  label?: string;
} & Pick<TextFieldProps, "label">;

export function RHFDateTimePicker<T extends FieldValues>({
  name,
  label,
  isEndTime = false,
}: Props<T>) {
  const { control, watch } = useFormContext<T>();
  const now = new Date();

  const isStartTime = name.includes("horaIni");
  const minStartTime = subHours(now, 2);
  const maxStartTime = now;

  const startTimePath = name.includes("horaFin")
    ? ("datosPsa.horaIni" as Path<T>)
    : null;
  const startTimeValue = startTimePath
    ? (watch(startTimePath) as string | undefined)
    : undefined;

  // Convert HHMM string to Date object
  const parseTimeString = (timeStr: string | undefined): Date | null => {
    if (!timeStr) return null;

    // If it's already an ISO string, just parse it
    if (timeStr.includes("T")) {
      return new Date(timeStr);
    }

    // If it's in HHMM format
    if (timeStr.length === 4) {
      const hours = parseInt(timeStr.substring(0, 2), 10);
      const minutes = parseInt(timeStr.substring(2, 4), 10);

      const today = new Date();
      today.setHours(hours, minutes, 0, 0);
      return today;
    }

    return null;
  };

  // Convert Date to HHMM string
  const formatToHHMM = (date: Date | null): string => {
    if (!date) return "";
    return format(date, "HHmm");
  };

  const startTime = parseTimeString(startTimeValue);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => {
        // Parse the current value to a Date object
        const dateValue = parseTimeString(value as string);

        let minTime = isStartTime ? minStartTime : undefined;
        if (isEndTime && startTime) {
          minTime = startTime;
        }

        return (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DateTimePicker
              label={label}
              {...field}
              value={dateValue}
              onChange={(newValue) => {
                if (!newValue) {
                  onChange("");
                  return;
                }

                // Apply constraints
                let finalDate = newValue;

                if (isStartTime) {
                  if (newValue > maxStartTime) {
                    finalDate = maxStartTime;
                  }
                  if (newValue < minStartTime) {
                    finalDate = minStartTime;
                  }
                }

                // Existing end time validation
                if (isEndTime && startTime && isBefore(finalDate, startTime)) {
                  finalDate = addMinutes(startTime, 1);
                }

                // Format to HHMM and store in form
                onChange(formatToHHMM(finalDate));
              }}
              minDateTime={isStartTime ? minStartTime : minTime}
              maxDateTime={isStartTime ? maxStartTime : undefined}
              views={["hours", "minutes"]}
              ampm={false}
              minutesStep={5}
              slotProps={{
                textField: {
                  error: false,
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}
