"use client";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Controller,
  type FieldValues,
  type Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import type { TextFieldProps } from "@mui/material";
import { useEffect } from "react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  flightType: "arribo" | "partida" | "";
  defaultValue?: PathValue<T, Path<T>>;
  helperText?: string;
} & Pick<TextFieldProps, "label">;

export function RHFFlightTimePicker<T extends FieldValues>({
  name,
  label,
  flightType,
  defaultValue = "0000" as PathValue<T, Path<T>>,
  helperText,
}: Props<T>) {
  const { control, watch, setValue } = useFormContext<T>();

  const isArriboField = name.toString().includes("horaArribo");
  const isPartidaField = name.toString().includes("horaPartida");

  const isActiveField =
    (flightType === "arribo" && isArriboField) ||
    (flightType === "partida" && isPartidaField);

  useEffect(() => {
    if (flightType && isActiveField) {
      const currentValue = watch(name);
      if (!currentValue || currentValue === "") {
        setValue(name, defaultValue);
      }
    }
  }, [watch, setValue, name, flightType, isActiveField, defaultValue]);

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

  const formatToHHMM = (date: Date | null): string => {
    if (!date) return "";
    return format(date, "HHmm");
  };

  if (!isActiveField) return null;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        const dateValue = parseTimeString(value as string);

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
                onChange(formatToHHMM(newValue));
              }}
              views={["hours", "minutes"]}
              ampm={false}
              minutesStep={5}
              slotProps={{
                textField: {
                  error: !!error,
                  helperText: error?.message || helperText,
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
