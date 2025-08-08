import { useState, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FlightIcon from "@mui/icons-material/Flight";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import {
  defaultValuesAeropuertos,
  AeropuertosSchema,
  aeropuertosSchema,
} from "../../../types/apiSchema";
import { useAeropuertos } from "../../../services/queries";
import { useCreateAeropuerto } from "../../../services/mutations";
import { AeropuertoOption } from "../../../../types/option";
import { useAppError } from "../../../../hooks/useAppError";
import { HelperTextWarning } from "../../../../components/WarningChip";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { setError } = useAppError();

  const methods = useForm<AeropuertosSchema>({
    resolver: zodResolver(aeropuertosSchema),
    defaultValues: defaultValuesAeropuertos,
    mode: "onChange",
  });

  const aeropuertosQuery = useAeropuertos();
  const createAeropuertoMutation = useCreateAeropuerto();

  const { watch, setValue } = methods;
  const aeropuertoWatch = watch("aeropuerto");
  const codIATAWatch = watch("codIATA");

  useEffect(() => {
    if (aeropuertoWatch) {
      onAeropuertoSelected(aeropuertoWatch);
    }
  }, [aeropuertoWatch, onAeropuertoSelected]);

  useEffect(() => {
    if (aeropuertosQuery.error) {
      setError(aeropuertosQuery.error);
    }
  }, [aeropuertosQuery.error, setError]);

  useEffect(() => {
    if (createAeropuertoMutation.error) {
      setError(createAeropuertoMutation.error);
    }
  }, [createAeropuertoMutation.error, setError]);

  const aeropuertoOptions: AeropuertoOption[] = useMemo(
    () =>
      aeropuertosQuery.data?.map((item) => ({
        id: item.id,
        aeropuerto: item.aeropuerto,
        codIATA: item.codIATA,
        codOACI: item.codOACI,
        isUserCreated: item.isUserCreated,
        createdAt: item.createdAt,
        needsValidation: item.needsValidation,
      })) || [],
    [aeropuertosQuery.data]
  );

  const { filteredOptions, hasSearched, shouldShowAddButton } = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    const hasSearched = searchTerm.length > 0;

    if (!hasSearched) {
      return {
        filteredOptions: aeropuertoOptions,
        hasSearched: false,
        shouldShowAddButton: false,
      };
    }

    const filtered = aeropuertoOptions.filter((option) => {
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

    // Show add button if search term is at least 2 characters, no results found, and no airport is currently selected
    const shouldShowAddButton =
      searchTerm.length >= 2 && filtered.length === 0 && !selectedAeropuerto;

    return {
      filteredOptions: filtered,
      hasSearched: true,
      shouldShowAddButton,
    };
  }, [inputValue, aeropuertoOptions, selectedAeropuerto]);

  // Update showAddButton state
  useEffect(() => {
    setShowAddButton(shouldShowAddButton);
  }, [shouldShowAddButton]);

  const filterOptions = () => {
    return filteredOptions;
  };

  const getOptionLabel = (option: AeropuertoOption | string) => {
    if (typeof option === "string") return option;
    return `${option.aeropuerto} (${option.codIATA})`;
  };

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: AeropuertoOption
  ) => (
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

          {option.codOACI && !option.isUserCreated && (
            <Chip
              label={`OACI: ${option.codOACI}`}
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

    const newAeropuerto: AeropuertosSchema = {
      aeropuerto: newAeropuertoName.toUpperCase(),
      codIATA: codIATAWatch || "",
      // codOACI will be generated automatically by the backend
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
        setInputValue("");
        setShowAddButton(false);
      },
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewAeropuertoName("");
    setValue("codIATA", "");
  };

  const handleOpenDialog = () => {
    if (inputValue.length === 3 && inputValue.match(/^[A-Z]{3}$/i)) {
      setValue("codIATA", inputValue.toUpperCase());
    }
    setNewAeropuertoName(inputValue);
    setOpenDialog(true);
  };

  const handleInputChange = (
    _event: React.SyntheticEvent,
    value: string,
    reason: string
  ) => {
    setInputValue(value);

    if (reason === "input") {
      setTimeout(() => {}, 0);
    }
  };

  const handleClearSelection = () => {
    setValue("aeropuerto", "");
    setSelectedAeropuerto(null);
    onAeropuertoSelected("");
    setShowAddButton(false);
  };

  return (
    <FormProvider {...methods}>
      {!selectedAeropuerto && (
        <Stack sx={{ gap: 1 }}>
          <Autocomplete
            freeSolo
            options={aeropuertoOptions}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
            renderOption={renderOption}
            value={selectedAeropuerto}
            inputValue={inputValue}
            onInputChange={handleInputChange}
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
                  setShowAddButton(false);
                  setInputValue(""); // Clear input value when airport is selected
                } else {
                  handleOpenDialog();
                }
              } else if (newValue) {
                setValue("aeropuerto", newValue.id);
                setSelectedAeropuerto(newValue);
                onAeropuertoSelected(newValue.id);
                setShowAddButton(false);
                setInputValue(""); // Clear input value when airport is selected
              } else {
                setValue("aeropuerto", "");
                setSelectedAeropuerto(null);
                onAeropuertoSelected("");
                setShowAddButton(false); // Hide add button when clearing selection
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
                  endAdornment: params.InputProps.endAdornment,
                }}
              />
            )}
            noOptionsText={
              <Box sx={{ textAlign: "center", py: 2 }}>
                {!hasSearched ? (
                  // Initial state - no search performed
                  <Box>
                    <SearchIcon
                      sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Comience a escribir para buscar aeropuertos
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Busque por nombre, código IATA o ICAO
                    </Typography>
                  </Box>
                ) : (
                  // After search with no results - this won't show the button anymore
                  <Box>
                    <InfoIcon
                      sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      No se encontraron aeropuertos para "{inputValue}"
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Intente con diferentes términos de búsqueda
                    </Typography>
                  </Box>
                )}
              </Box>
            }
            filterSelectedOptions
            autoHighlight
            clearOnBlur={false}
            selectOnFocus
            handleHomeEndKeys
            loading={false}
            openOnFocus
            blurOnSelect={false}
          />

          {/* Mobile-friendly Add Button - appears below the autocomplete */}
          <Fade in={showAddButton} timeout={300}>
            <Paper
              elevation={2}
              sx={{
                mt: 1,
                p: 2,
                borderRadius: 2,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <InfoIcon
                  sx={{ fontSize: 24, color: "text.secondary", mb: 1 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  No se encontró "{inputValue}"
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    minHeight: 48,
                    fontSize: "1rem",
                    borderRadius: 2,
                    boxShadow: theme.shadows[2],
                    "&:hover": {
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  Agregar "{inputValue}" como nuevo aeropuerto
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Stack>
      )}
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
            sx={{ minHeight: 44, minWidth: 44 }}
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
            sx={{ minWidth: 100, minHeight: 44 }}
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
              minHeight: 44,
            }}
          >
            {createAeropuertoMutation.isPending ? "Agregando..." : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
      {selectedAeropuerto && (
        <Card elevation={2} sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FlightIcon sx={{ color: "primary.main" }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Aeropuerto Seleccionado
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleClearSelection}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {selectedAeropuerto.aeropuerto}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <Chip
                label={`IATA: ${selectedAeropuerto.codIATA}`}
                size="small"
                color="primary"
              />
              {selectedAeropuerto.codOACI &&
                !selectedAeropuerto.isUserCreated && (
                  <Chip
                    label={`ICAO: ${selectedAeropuerto.codOACI}`}
                    size="small"
                    variant="outlined"
                  />
                )}
            </Box>

            {selectedAeropuerto.isUserCreated && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <HelperTextWarning
                  isUserCreated={selectedAeropuerto.isUserCreated}
                  itemType="Aeropuerto"
                />
              </Box>
            )}
          </CardContent>
        </Card>
      )}
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
