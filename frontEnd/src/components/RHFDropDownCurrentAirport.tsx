import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { UnidadOption } from "../types/option";
import {
  TextFieldProps,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: UnidadOption[];
  label: string;
} & TextFieldProps;

export function RHFDropDownCurrentAirport<T extends FieldValues>({
  name,
  options,
  label,
  margin = "normal",
}: Props<T>) {
  const { control } = useFormContext<T>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <Box
          sx={{
            width: "100%",
            mt: margin === "normal" ? 2 : 1,
            mb: margin === "normal" ? 1 : 0,
            position: "relative",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              value={value || ""}
              label={label}
              onChange={(event) => {
                onChange(event.target.value);
              }}
              MenuProps={{
                container: document.body,
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                  sx: {
                    width: "auto",
                    minWidth: "100%",
                    maxWidth: {
                      xs: "calc(100vw - 32px)",
                      sm: 400,
                    },
                    zIndex: 9999,
                    mt: 0.5,
                    boxShadow: (theme) => theme.shadows[4],
                    overflow: "hidden",
                  },
                },
                disablePortal: false,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              {...restField}
            >
              {options?.map((option) => (
                <MenuItem
                  value={option.id}
                  key={option.id}
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    padding: isMobile ? "8px 16px" : "6px 16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "normal",
                      marginRight: isMobile ? 0 : 1,
                      fontSize: isMobile ? "0.875rem" : "inherit",
                      width: isMobile ? "100%" : "auto",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {option.aeropuerto}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "0.875rem" : "inherit",
                      marginTop: isMobile ? 0.5 : 0,
                    }}
                  >
                    ({option.codIATA})
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    />
  );
}
