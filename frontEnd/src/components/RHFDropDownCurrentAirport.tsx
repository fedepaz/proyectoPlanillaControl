import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { UnidadOption } from "../types/option";

interface RHFDropDownCurrentAirportProps<T extends FieldValues> {
  name: FieldPath<T>;
  options: UnidadOption[];
  label: string;
  margin?: "none" | "dense" | "normal";
  fullWidth?: boolean;
}

export function RHFDropDownCurrentAirport<T extends FieldValues>({
  name,
  options,
  label,
  margin = "none",
  fullWidth = false,
}: RHFDropDownCurrentAirportProps<T>) {
  const { control } = useFormContext<T>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileDialogOpen, setMobileDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar opciones basado en búsqueda
  const filteredOptions = options.filter(
    (option) =>
      option.aeropuerto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.codIATA.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMobileSelection = (
    option: UnidadOption,
    onChange: (value: string) => void
  ) => {
    onChange(option.id);
    setMobileDialogOpen(false);
    setSearchTerm("");
  };

  const getDisplayValue = (value: string) => {
    const selected = options.find((option) => option.id === value);
    return selected ? `${selected.aeropuerto} (${selected.codIATA})` : "";
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          {isMobile ? (
            // Versión Mobile con Dialog
            <>
              <TextField
                fullWidth={fullWidth}
                margin={margin}
                label={label}
                value={getDisplayValue(value)}
                onClick={() => setMobileDialogOpen(true)}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Seleccionar unidad..."
              />

              <Dialog
                open={mobileDialogOpen}
                onClose={() => setMobileDialogOpen(false)}
                fullWidth
                maxWidth="md"
                PaperProps={{
                  sx: {
                    maxHeight: "80vh",
                    m: 2,
                    borderRadius: 2,
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 1,
                  }}
                >
                  <Typography variant="h6">{label}</Typography>
                  <IconButton
                    onClick={() => setMobileDialogOpen(false)}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>

                <DialogContent sx={{ pt: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Buscar aeropuerto, código IATA o OACI..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                    autoFocus
                  />

                  <List sx={{ maxHeight: "50vh", overflow: "auto" }}>
                    {filteredOptions.map((option) => (
                      <ListItem
                        key={option.id}
                        button
                        onClick={() => handleMobileSelection(option, onChange)}
                        selected={value === option.id}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          "&.Mui-selected": {
                            backgroundColor: theme.palette.primary.light + "20",
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Typography variant="body2" fontWeight="medium">
                                {option.aeropuerto}
                              </Typography>
                              <Chip
                                label={option.codIATA}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={`OACI: ${option.codOACI}`}
                        />
                      </ListItem>
                    ))}

                    {filteredOptions.length === 0 && (
                      <ListItem>
                        <ListItemText
                          primary="No se encontraron resultados"
                          secondary="Intenta con otro término de búsqueda"
                        />
                      </ListItem>
                    )}
                  </List>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            // Versión Desktop con Autocomplete
            <Autocomplete
              options={options}
              getOptionLabel={(option) =>
                `${option.aeropuerto} (${option.codIATA})`
              }
              value={options.find((option) => option.id === value) || null}
              onChange={(_, newValue) => onChange(newValue?.id || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  margin={margin}
                  fullWidth={fullWidth}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {option.aeropuerto}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      IATA: {option.codIATA} • OACI: {option.codOACI}
                    </Typography>
                  </Box>
                </Box>
              )}
              filterOptions={(options, { inputValue }) => {
                return options.filter(
                  (option) =>
                    option.aeropuerto
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    option.codIATA
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    option.codOACI
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                );
              }}
            />
          )}
        </>
      )}
    />
  );
}
