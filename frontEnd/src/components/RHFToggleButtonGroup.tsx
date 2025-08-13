"use client";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
  helperText?: string;
};

export function RHFToggleButtonGroup<T extends FieldValues>({
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
      render={({
        field: { onChange, value, ...restField },
        fieldState: { error },
      }) => (
        <FormControl error={!!error}>
          <FormLabel> {label}</FormLabel>
          <ToggleButtonGroup
            size="small"
            orientation="vertical"
            onChange={(_, newValue) => {
              if (newValue !== null) {
                onChange(newValue);
              }
            }}
            value={value || null}
            {...restField}
            sx={{
              "& .MuiToggleButtonGroup-root": {
                textTransform: "none",
                "&.Mui-selected": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.contrastText
                      : theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light,
                  },
                },
              },
            }}
          >
            {options?.map((option) => (
              <ToggleButton value={option.id} key={option.id}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <FormHelperText>{error?.message || helperText}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}
