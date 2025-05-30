import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FlightIcon from "@mui/icons-material/Flight";
import SearchIcon from "@mui/icons-material/Search";
import {
  defaultValuesAeropuertos,
  AeropuertosSchema,
  aeropuertosSchema,
} from "../../../types/apiSchema";
import { useAeropuertos } from "../../../services/queries";
import { useCreateAeropuerto } from "../../../services/mutations";
import { AeropuertoOption } from "../../../../types/option";
import ErrorPage from "../../../../components/Error";

interface AeropuertoComponentProps {
  onAeropuertoSelected: (aeropuerto: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export function AeropuertoComponent({
  onAeropuertoSelected,
  label = "Aeropuerto",
  placeholder = "Buscar por nombre o código IATA (ej: Buenos Aires, EZE, COR)",
  required = false,
}: AeropuertoComponentProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newAeropuertoName, setNewAeropuertoName] = useState("");
  const [selectedAeropuerto, setSelectedAeropuerto] =
    useState<AeropuertoOption | null>(null);
  const [createError, setCreateError] = useState<Error | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const methods = useForm<AeropuertosSchema>({
    resolver: zodResolver(aeropuertosSchema),
    defaultValues: defaultValuesAeropuertos,
    mode: "onChange",
  });

  const aeropuertosQuery = useAeropuertos();
  const createAeropuertoMutation = useCreateAeropuerto();

  const { watch, setValue, control } = methods;
  const aeropuertoWatch = watch("aeropuerto");
  const codIATAWatch = watch("codIATA");

  const [inputValue, setInputValue] = useState("");

  const filterOptions = (
    options: AeropuertoOption[],
    { inputValue }: { inputValue: string }
  ) => {
    if (!inputValue) return options;

    const searchTerm = inputValue.toLowerCase().trim();

    return options.filter((option) => {
      const nameMatch = option.aeropuerto.toLowerCase().includes(searchTerm);

      const iataMatch = option.codIATA.toLowerCase().includes(searchTerm);

      const icaoMatch = option.codOACI?.toLowerCase().includes(searchTerm);

      const words = searchTerm.split(" ").filter((word) => word.length > 0);
      const allWordsMatch = words.every(
        (word) =>
          option.aeropuerto.toLowerCase().includes(word) ||
          option.codIATA.toLowerCase().includes(word) ||
          option.codOACI?.toLowerCase().includes(word)
      );

      return nameMatch || iataMatch || icaoMatch || allWordsMatch;
    });
  };

  const getOptionLabel = (option: AeropuertoOption | string) => {
    if (typeof option === "string") return option;
    return `${option.aeropuerto} (${option.codIATA})`;
  };

  const renderOption = (props: any, option: AeropuertoOption) => (
    <Box component="li" {...props} key={option.id}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FlightIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {option.aeropuerto}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, ml: 3, mt: 0.5 }}>
          <Chip
            label={`IATA: ${option.codIATA}`}
            size="small"
            variant="outlined"
            sx={{ fontSize: "0.75rem", height: 20 }}
          />

          {option.codOACI && (
            <Chip
              label={`ICAO: ${option.codOACI}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.75rem", height: 20 }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );

  const handleCreateNewAeropuerto = () => {
    if (!newAeropuertoName.trim()) return;

    // Clear previous errors
    setCreateError(null);

    const newAeropuerto: AeropuertosSchema = {
      aeropuerto: newAeropuertoName.toUpperCase(),
      codIATA: codIATAWatch || "",
      codOACI: "AAAA", // You might want to make this configurable
    };

    createAeropuertoMutation.mutate(newAeropuerto, {
      onSuccess: (data) => {
        setValue("aeropuerto", data.id);
        setOpenDialog(false);
        setNewAeropuertoName("");
        setValue("codIATA", "");
        onAeropuertoSelected(data.id);

        const newOption: AeropuertoOption = {
          id: data.id,
          aeropuerto: data.aeropuerto,
          codIATA: data.codIATA,
          codOACI: data.codOACI,
        };
        setSelectedAeropuerto(newOption);

        setSnackbarOpen(true);
      },
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewAeropuertoName("");
    setValue("codIATA", "");
    setCreateError(null);
  };

  const handleRetryCreate = () => {
    setCreateError(null);
    handleCreateNewAeropuerto();
  };

  const handleOpenDialog = () => {
    if (inputValue.length === 3 && inputValue.match(/^[A-Z]{3}$/i)) {
      setValue("codIATA", inputValue.toUpperCase());
    }
    setNewAeropuertoName(inputValue);
    setOpenDialog(true);
  };

  useEffect(() => {
    if (aeropuertoWatch) {
      onAeropuertoSelected(aeropuertoWatch);
    }
  }, [aeropuertoWatch, onAeropuertoSelected]);

  const aeropuertoOptions: AeropuertoOption[] =
    aeropuertosQuery.data?.map((item) => ({
      id: item.id,
      aeropuerto: item.aeropuerto,
      codIATA: item.codIATA,
      codOACI: item.codOACI,
    })) || [];

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <Autocomplete
          freeSolo
          options={aeropuertoOptions}
          getOptionLabel={getOptionLabel}
          filterOptions={filterOptions}
          renderOption={renderOption}
          value={selectedAeropuerto}
          inputValue={inputValue}
          onInputChange={(_, value) => setInputValue(value)}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {
              const searchTerm = newValue.trim().toUpperCase();
              const existing = aeropuertoOptions.find(
                (opt) =>
                  opt.aeropuerto.toUpperCase().includes(searchTerm) ||
                  opt.codIATA === searchTerm ||
                  opt.codOACI === searchTerm
              );

              if (existing) {
                setValue("aeropuerto", existing.id);
                setSelectedAeropuerto(existing);
                onAeropuertoSelected(existing.id);
              } else {
                handleOpenDialog();
              }
            } else if (newValue) {
              setValue("aeropuerto", newValue.id);
              setSelectedAeropuerto(newValue);
              onAeropuertoSelected(newValue.id);
            } else {
              setValue("aeropuerto", "");
              setSelectedAeropuerto(null);
              onAeropuertoSelected("");
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              required={required}
              helperText="Escriba el nombre del aeropuerto o código IATA/ICAO para buscar"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {params.InputProps.endAdornment}
                    <IconButton
                      onClick={handleOpenDialog}
                      title="Agregar nuevo aeropuerto"
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          noOptionsText={
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Typography variant="body2" color="text.secondary">
                No se encontraron aeropuertos
              </Typography>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{ mt: 1 }}
              >
                Agregar "{inputValue}"
              </Button>
            </Box>
          }
          filterSelectedOptions
          autoHighlight
          clearOnBlur={false}
          selectOnFocus
          handleHomeEndKeys
        />
      </Stack>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : 2,
            width: fullScreen ? "100%" : "auto",
            maxWidth: fullScreen ? "100%" : 500,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.divider}`,
            pb: 1,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                mr: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: `${theme.palette.primary.main}20`,
                color: theme.palette.primary.main,
              }}
            >
              <AddIcon />
            </Box>
            <Typography variant="h6" component="div">
              Agregar nuevo aeropuerto
            </Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 2, px: { xs: 2, sm: 3 } }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            Complete la información del nuevo aeropuerto
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Nombre del aeropuerto"
            fullWidth
            value={newAeropuertoName}
            onChange={(e) => setNewAeropuertoName(e.target.value)}
            variant="outlined"
            helperText="Nombre completo del aeropuerto"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mt: 2 }}
          />

          <TextField
            margin="dense"
            label="Código IATA"
            fullWidth
            value={codIATAWatch || ""}
            onChange={(e) => setValue("codIATA", e.target.value.toUpperCase())}
            variant="outlined"
            helperText="Código IATA de 3 letras (ej: EZE, COR)"
            inputProps={{ maxLength: 3 }}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2, sm: 3 },
            py: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateNewAeropuerto}
            disabled={
              !newAeropuertoName.trim() || createAeropuertoMutation.isPending
            }
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              minWidth: 100,
              ml: 1,
            }}
          >
            {createAeropuertoMutation.isPending ? "Agregando..." : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Aeropuerto agregado exitosamente!
        </Alert>
      </Snackbar>
    </FormProvider>
  );
}
