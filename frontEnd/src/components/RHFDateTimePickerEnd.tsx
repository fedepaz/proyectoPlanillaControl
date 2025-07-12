import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";
import { addMinutes, isBefore, format } from "date-fns";

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  isEndTime?: boolean;
  startTimeValue?: string;
  label?: string;
  minTimeConstraint?: Date;
  maxTimeConstraint?: Date;
  disabled?: boolean;
}

export function RHFDateTimePickerEnd({
  value,
  onChange,
  label,
  isEndTime = false,
  startTimeValue,
  minTimeConstraint,
  maxTimeConstraint,
  disabled = false,
}: DateTimePickerProps) {
  const parseTimeString = (timeStr: string | undefined): Date | null => {
    if (!timeStr) return null;
    if (timeStr.includes("T")) return new Date(timeStr);
    if (timeStr.length === 4) {
      const hours = parseInt(timeStr.substring(0, 2), 10);
      const minutes = parseInt(timeStr.substring(2, 4), 10);
      const today = new Date();
      today.setHours(hours, minutes, 0, 0);
      return today;
    }
    return null;
  };

  const formatToHHMM = (date: Date | null): string => {
    return date ? format(date, "HHmm") : "";
  };

  const startTime = startTimeValue ? parseTimeString(startTimeValue) : null;
  const dateValue = parseTimeString(value);

  let minTime: Date | undefined = undefined;
  if (isEndTime && startTime) {
    minTime = startTime;
  } else if (minTimeConstraint) {
    minTime = minTimeConstraint;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <DateTimePicker
        label={label}
        value={dateValue}
        onChange={(newValue) => {
          if (!newValue) {
            onChange("");
            return;
          }

          let finalDate = newValue;

          // Apply time constraints
          if (minTimeConstraint && isBefore(finalDate, minTimeConstraint)) {
            finalDate = minTimeConstraint;
          }

          if (maxTimeConstraint && finalDate > maxTimeConstraint) {
            finalDate = maxTimeConstraint;
          }

          if (isEndTime && startTime && isBefore(finalDate, startTime)) {
            finalDate = addMinutes(startTime, 1);
          }

          onChange(formatToHHMM(finalDate));
        }}
        minDateTime={minTime}
        maxDateTime={maxTimeConstraint}
        views={["hours", "minutes"]}
        ampm={false}
        minutesStep={5}
        slotProps={{
          textField: {
            error: false,
            fullWidth: true,
          },
        }}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
}
