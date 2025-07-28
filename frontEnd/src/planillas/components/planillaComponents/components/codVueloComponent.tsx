import {
  TextField,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Card,
  CardContent,
  FormLabel,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { CodVueloOption, EmpresaOption } from "../../../../types/option";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FlightIcon from "@mui/icons-material/Flight";
import TagIcon from "@mui/icons-material/Tag";
import {
  codVueloSchema,
  CodVueloSchema,
  defaultValuesCodVuelos,
} from "../../../types/apiSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppError } from "../../../../hooks/useAppError";
import { useCodVueloBusqueda, useEmpresaId } from "../../../services/queries";
import { useCreateCodVuelo } from "../../../services/mutations";
import { RHFDropDownCodVuelo } from "../../../../components/RHFDropDownCodVuelo";
import { HelperTextWarning } from "../../../../components/WarningChip";

interface CodVueloComponentProps {
  onCodVueloSelected: (codVuelo: string) => void;
  origenId: string;
  destinoId: string;
  empresaId: string;
}

export function CodVueloComponent({
  onCodVueloSelected,
  origenId,
  destinoId,
  empresaId,
}: CodVueloComponentProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newCodVueloNumber, setNewCodVueloNumber] = useState("");
  const [selectedCodVuelo, setSelectedCodVuelo] =
    useState<CodVueloOption | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { setError } = useAppError();

  const empresaQuery = useEmpresaId(empresaId);

  const methods = useForm<CodVueloSchema>({
    resolver: zodResolver(codVueloSchema),
    defaultValues: {
      ...defaultValuesCodVuelos,
      origen: origenId,
      destino: destinoId,
      empresa: empresaId,
    },
    mode: "onChange",
  });
  const { watch, setValue } = methods;
  const codVueloWatch = watch("codVuelo");

  const params =
    origenId && destinoId && empresaId
      ? { origen: origenId, destino: destinoId, empresa: empresaId }
      : null;

  const codVueloQuery = useCodVueloBusqueda(params);
  const createCodVueloMutation = useCreateCodVuelo();

  // Transform codVuelo data to match CodVueloOption format
  const codVueloOptions: CodVueloOption[] = useMemo(
    () =>
      codVueloQuery.data?.map((item) => ({
        id: item.id,
        codVuelo: item.codVuelo,
        origen: item.origen,
        destino: item.destino,
        empresa: item.empresa,
        isUserCreated: item.isUserCreated,
        createdAt: item.createdAt,
        needsValidation: item.needsValidation,
      })) || [],
    [codVueloQuery.data]
  );

  useEffect(() => {
    if (codVueloWatch) {
      const selected = codVueloOptions.find(
        (option) => option.id === codVueloWatch
      );

      if (selectedCodVuelo?.id !== selected?.id) {
        setSelectedCodVuelo(selected || null);
        onCodVueloSelected(codVueloWatch);
      }
    }
  }, [codVueloWatch, onCodVueloSelected, codVueloOptions, selectedCodVuelo]);

  useEffect(() => {
    if (codVueloQuery.error) {
      setError(codVueloQuery.error);
    }
  }, [codVueloQuery.error, setError]);

  useEffect(() => {
    if (createCodVueloMutation.error) {
      setError(createCodVueloMutation.error);
    }
  }, [createCodVueloMutation.error, setError]);

  if (!empresaQuery.data) return null;
  const empresaOption: EmpresaOption = empresaQuery.data;

  const getDisplayInfo = () => {
    const empresaName = empresaOption.empresa.split(" ");

    let firstLetter = "";
    let secondLetter = "";
    if (empresaName.length === 1) {
      firstLetter = empresaName[0].charAt(0).toUpperCase();
      secondLetter = empresaName[0].charAt(1).toUpperCase();
    } else {
      firstLetter = empresaName[0].charAt(0).toUpperCase();
      secondLetter = empresaName[1].charAt(0).toUpperCase();
    }
    return {
      label: firstLetter + secondLetter,
      fullName: empresaOption.empresa,
      icon: <TagIcon />,
      color: theme.palette.secondary.main,
    };
  };

  const {
    label: displayLabel,
    fullName: displayFullName,
    icon: displayIcon,
    color: displayColor,
  } = getDisplayInfo();

  const handleCreateNewCodVuelo = () => {
    if (!newCodVueloNumber.trim()) return;
    const newCodVuelo: CodVueloSchema = {
      codVuelo: newCodVueloNumber.toUpperCase(),
      origen: origenId,
      destino: destinoId,
      empresa: empresaId,
    };

    createCodVueloMutation.mutate(newCodVuelo, {
      onSuccess: (data) => {
        setValue("codVuelo", data.id);
        setOpenDialog(false);
        setNewCodVueloNumber("");
        onCodVueloSelected(data.id);

        const newOption: CodVueloOption = {
          id: data.id,
          codVuelo: data.codVuelo,
          origen: data.origen,
          destino: data.destino,
          empresa: data.empresa,
        };
        setSelectedCodVuelo(newOption);
        setSnackbarOpen(true);
      },
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewCodVueloNumber("");
  };

  const handleClearSelection = () => {
    setValue("codVuelo", "");
    setSelectedCodVuelo(null);
    onCodVueloSelected("");
  };

  return (
    <FormProvider {...methods}>
      <FormLabel>Codigo de vuelo</FormLabel>
      <Stack sx={{ gap: 1 }}>
        {!selectedCodVuelo && (
          <RHFDropDownCodVuelo<CodVueloSchema>
            name="codVuelo"
            options={codVueloQuery.data}
            label={displayLabel}
            onAddNew={() => setOpenDialog(true)}
          />
        )}
        {selectedCodVuelo && (
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: `${displayColor}20`,
                      color: displayColor,
                    }}
                  >
                    {displayIcon}
                  </Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Vuelo Seleccionado
                  </Typography>
                </Box>
                <IconButton size="small" onClick={handleClearSelection}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {selectedCodVuelo.codVuelo}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <Chip
                  label={displayFullName}
                  size="small"
                  variant="outlined"
                  sx={{ bgcolor: `${displayColor}20`, color: displayColor }}
                />
              </Box>
              {selectedCodVuelo.isUserCreated && (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                >
                  <HelperTextWarning
                    isUserCreated={selectedCodVuelo.isUserCreated}
                    itemType="Vuelo"
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        )}
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
              Agregar nuevo código de vuelo
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
            Ingrese el código de vuelo
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Código del vuelo"
            fullWidth
            value={newCodVueloNumber}
            onChange={(e) => setNewCodVueloNumber(e.target.value)}
            variant="outlined"
            helperText="Código del vuelo"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightIcon />
                </InputAdornment>
              ),
            }}
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
            onClick={handleCreateNewCodVuelo}
            disabled={
              !newCodVueloNumber.trim() || createCodVueloMutation.isPending
            }
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              minWidth: 100,
              minHeight: 44,
            }}
          >
            {createCodVueloMutation.isPending ? "Agregando..." : "Agregar"}
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
          ¡Código de vuelo agregado exitosamente!
        </Alert>
      </Snackbar>
    </FormProvider>
  );
}
