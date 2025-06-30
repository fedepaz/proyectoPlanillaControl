import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";

import {
  defaultValuesVehiculos,
  vehiculoSchema,
  VehiculosSchema,
  VehiculosSchemaInput,
} from "../../../types/apiSchema";
import {
  useTipoVehiculo,
  useVehiculoBusqueda,
} from "../../../services/queries";
import { useEffect, useState } from "react";
import { VehiculoOption } from "../../../../types/option";
import { useAppError } from "../../../../hooks/useAppError";
import { useCreateVehiculo } from "../../../services/mutations";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { VehiculoDetailsDialog } from "../../../../components/VehiculoDetailsDialog";
import { VehiculoDeleteDialog } from "../../../../components/VehiculoDeleteDialog";
import { CompactVehiculoCard } from "../../../../components/CompactVehiculoCard";
import { VehiculoTableDetails } from "../../../../components/VehiculoTableDetails";
import { RHFRadioGroup } from "../../../../components/RHFRadioGroup";
//import {  useForm } from "react-hook-form";

interface VehiculoComponentProps {
  onVehiculosListChange: (vehiculoList: VehiculoOption[]) => void;
  onVehiculosListConfirm?: (vehiculoList: VehiculoOption[]) => void;
  empresaId: string;
  requireConfirmation?: boolean;
  initialVehiculoList?: VehiculoOption[];
}

export function VehiculoComponent({
  onVehiculosListChange,
  onVehiculosListConfirm,
  empresaId,
  requireConfirmation = false,
  initialVehiculoList = [],
}: VehiculoComponentProps) {
  const [vehiculoList, setVehiculoList] =
    useState<VehiculoOption[]>(initialVehiculoList);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [searchNumInterno, setSearchNumInterno] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundVehiculo, setFoundVehiculo] = useState<VehiculoOption | null>(
    null
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] =
    useState<VehiculoOption | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const { setError } = useAppError();
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchTriggerNumInterno, setSearchTriggerNumInterno] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const methods = useForm<VehiculosSchemaInput>({
    resolver: zodResolver(vehiculoSchema),
    defaultValues: {
      ...defaultValuesVehiculos,
      empresa: empresaId,
    },
    mode: "onChange",
  });

  const { reset: resetForm } = methods;
  const createVehiculoMutation = useCreateVehiculo();

  const params =
    shouldSearch && empresaId && searchTriggerNumInterno
      ? { numInterno: searchTriggerNumInterno, empresa: empresaId }
      : null;
  const vehiculoQuery = useVehiculoBusqueda(params);

  useEffect(() => {
    if (!requireConfirmation) {
      onVehiculosListChange(vehiculoList);
    }
  }, [vehiculoList, onVehiculosListChange, requireConfirmation]);

  const handleSearch = () => {
    if (!searchNumInterno || !searchNumInterno.trim()) {
      showSnackbar("Por favor ingrese un número de vehiculo", "warning");
      return;
    }

    if (
      vehiculoList.some(
        (v) => v.numInterno.toString() === searchNumInterno.toString()
      )
    ) {
      showSnackbar("El número de vehiculo ya está cargado", "warning");
      return;
    }

    if (vehiculoList.length >= 10) {
      showSnackbar(`No puedes agregar más de 10 vehiculos`, "warning");
      return;
    }
    setIsSearching(true);
    setShouldSearch(true);
    setSearchTriggerNumInterno(searchNumInterno);
  };

  useEffect(() => {
    if (vehiculoQuery.data !== undefined && shouldSearch && isSearching) {
      if (vehiculoQuery.data) {
        const vehiculo = vehiculoQuery.data;

        setFoundVehiculo({
          id: vehiculo.id,
          tipoVehiculo: {
            id: vehiculo.tipoVehiculo.id,
            label: vehiculo.tipoVehiculo.label,
          },
          empresa: vehiculo.empresa,
          numInterno: vehiculo.numInterno,
          isUserCreated: vehiculo.isUserCreated,
          needsValidation: vehiculo.needsValidation,
        });
      } else {
        setFoundVehiculo(null);
        setShowAddDialog(true);
        resetForm({
          ...defaultValuesVehiculos,
          numInterno: searchNumInterno,
          empresa: empresaId,
        });
      }
      setIsSearching(false);
      setShouldSearch(false);
    }
  }, [
    vehiculoQuery.data,
    isSearching,
    searchNumInterno,
    resetForm,
    empresaId,
    shouldSearch,
  ]);

  useEffect(() => {
    if (vehiculoQuery.error && shouldSearch) {
      setIsSearching(false);
      setShouldSearch(false);
      if (
        vehiculoQuery.error instanceof AxiosError &&
        vehiculoQuery.error.response
      ) {
        const error = vehiculoQuery.error.response.data;
        if (error.name === "VehiculoRegistrado") {
          showSnackbar(error.message, "warning");
          setTimeout(() => {
            setSearchNumInterno("");
          }, 2000);
          return;
        }
      }
      setFoundVehiculo(null);
      setError(vehiculoQuery.error);
      setSearchTriggerNumInterno("");
    }
  }, [vehiculoQuery.error, shouldSearch, setError]);

  const handleAddFoundVehiculo = () => {
    if (foundVehiculo) {
      const newList = [...vehiculoList, foundVehiculo];
      setVehiculoList(newList);
      onVehiculosListChange(newList);
      setFoundVehiculo(null);
      setSearchNumInterno("");
      setIsConfirmed(false);
      showSnackbar("Vehiculo agregado exitosamente", "success");
    }
  };

  const handleCreateNewVehiculo = (data: VehiculosSchemaInput) => {
    const transformedData: VehiculosSchema = {
      tipoVehiculo: data.tipoVehiculo,
      empresa: data.empresa,
      numInterno: data.numInterno,
    };
    createVehiculoMutation.mutate(transformedData, {
      onSuccess: (newVehiculo) => {
        const vehiculoData: VehiculoOption = {
          id: newVehiculo.id,
          tipoVehiculo: {
            id: newVehiculo.tipoVehiculo.id,
            label: newVehiculo.tipoVehiculo.label,
          },
          empresa: newVehiculo.empresa,
          numInterno: newVehiculo.numInterno,
          isUserCreated: newVehiculo.isUserCreated,
          needsValidation: newVehiculo.needsValidation,
        };

        const newList = [...vehiculoList, vehiculoData];
        setVehiculoList(newList);
        onVehiculosListChange(newList);
        setShowAddDialog(false);
        setSearchNumInterno("");
        setFoundVehiculo(null);
        setIsConfirmed(false);
        setSnackbarOpen(true);
        setSnackbarMessage("Vehiculo agregado exitosamente");
        setSnackbarSeverity("success");
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          if (error.response.data.name === "VehiculoRegistrado") {
            showSnackbar(error.response.data.message, "warning");
            setTimeout(() => {
              setShowAddDialog(false);
              setSearchNumInterno("");
            }, 2000);
            return;
          }
        }
        setError(error);
      },
    });
  };

  const handleDelete = (vehiculo: VehiculoOption) => {
    if (vehiculo) {
      const newList = vehiculoList.filter((v) => v.id !== vehiculo.id);
      setVehiculoList(newList);
      setIsConfirmed(false);
      showSnackbar(
        `${vehiculo.tipoVehiculo.label} ${vehiculo.numInterno} eliminado exitosamente`,
        "success"
      );
    }
  };

  const handleConfirmDelete = () => {
    if (selectedVehiculo) {
      handleDelete(selectedVehiculo);
      setShowDeleteDialog(false);
      setSelectedVehiculo(null);
    }
  };

  const handleConfirmList = () => {
    if (requireConfirmation) {
      setShowConfirmDialog(true);
    } else {
      setIsConfirmed(true);
      onVehiculosListConfirm?.(vehiculoList);
      showSnackbar("Lista de vehiculos confirmada exitosamente", "success");
    }
  };

  const handleConfirmDialogAccept = () => {
    setIsConfirmed(true);
    setShowConfirmDialog(false);
    onVehiculosListChange(vehiculoList);
    onVehiculosListConfirm?.(vehiculoList);
    showSnackbar("Lista de vehiculos confirmada exitosamente", "success");
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning"
  ) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setSearchNumInterno("");
    setFoundVehiculo(null);
  };

  const canConfirm = vehiculoList.length > 0 && !isConfirmed;

  return (
    <Stack spacing={isMobile ? 2 : 3}>
      <Card>
        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <DirectionsCar />
            Vehiculos
            {isConfirmed && <CheckCircleIcon color="success" />}
          </Typography>

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            alignItems="stretch"
          >
            <TextField
              label="Buscar por número de vehiculo"
              value={searchNumInterno}
              onChange={(e) => setSearchNumInterno(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              disabled={vehiculoList.length >= 10 || isConfirmed}
              fullWidth
              size={isMobile ? "medium" : "small"}
              type="text"
              inputRef={(input) => {
                if (vehiculoQuery.error && shouldSearch && input) {
                  setTimeout(() => input.focus(), 100);
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isSearching || !searchNumInterno.trim() || isConfirmed}
              startIcon={<SearchIcon />}
              fullWidth={isMobile}
              sx={{
                minWidth: isMobile ? "auto" : 120,
                border:
                  vehiculoQuery.error && shouldSearch
                    ? "1px solid red"
                    : "none",
              }}
            >
              {isSearching ? "Buscando..." : "Buscar"}
            </Button>
          </Stack>

          {isConfirmed && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Lista de vehiculos confirmada. {vehiculoList.length} vehiculos
              seleccionados.
            </Alert>
          )}
        </CardContent>
      </Card>

      {foundVehiculo && !isConfirmed && (
        <Card sx={{ bgcolor: "success.light", color: "success.contrastText" }}>
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
              Vehículo Encontrado
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
              <strong>Tipo de Vehiculo:</strong>{" "}
              {foundVehiculo.tipoVehiculo.label.toUpperCase()}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
              <strong>Número Interno:</strong> {foundVehiculo.numInterno}
            </Typography>

            <Stack direction={isMobile ? "column" : "row"} spacing={2} mt={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddFoundVehiculo}
                startIcon={<AddIcon />}
                fullWidth={isMobile}
              >
                Agregar a la lista
              </Button>
              <Button
                variant="outlined"
                onClick={() => setFoundVehiculo(null)}
                startIcon={<CloseIcon />}
                fullWidth={isMobile}
                sx={{
                  backgroundColor: "error.main",
                  color: "error.contrastText",
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {vehiculoList.length > 0 && (
        <>
          {isMobile ? (
            // Mobile: Card Layout
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Vehiculos Agregados ({vehiculoList.length})
              </Typography>
              {vehiculoList.map((vehiculo) => (
                <CompactVehiculoCard
                  vehiculo={vehiculo}
                  key={vehiculo.id}
                  onDelete={isConfirmed ? undefined : handleDelete}
                  showActions={!isConfirmed}
                />
              ))}
            </Box>
          ) : (
            <VehiculoTableDetails
              vehiculoList={vehiculoList}
              onDelete={isConfirmed ? undefined : handleDelete}
              showActions={!isConfirmed}
            />
          )}

          {requireConfirmation && !isConfirmed && (
            <Button
              variant={isConfirmed ? "outlined" : "contained"}
              color={isConfirmed ? "success" : "primary"}
              onClick={handleConfirmList}
              disabled={!canConfirm}
              startIcon={isConfirmed ? <CheckCircleIcon /> : <SaveIcon />}
              size={isMobile ? "small" : "medium"}
              fullWidth={isMobile}
            >
              Confirmar Lista
            </Button>
          )}
        </>
      )}

      {vehiculoList.length === 0 && (
        <Card sx={{ textAlign: "center", py: isMobile ? 3 : 4 }}>
          <CardContent>
            <DirectionsCar
              sx={{
                fontSize: isMobile ? "40px" : "48px",
                color: "text.secondary",
                mb: 2,
              }}
            />
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color="text.secondary"
              gutterBottom
            >
              No hay vehiculos
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              color="text.secondary"
            >
              Busque un vehiculo por número de interno
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" gap={1}>
            <CheckCircleIcon color="primary" />
            <Typography variant="h6">Confirmar Lista de Vehiculos</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            ¿Está seguro que desea confirmar la lista con{" "}
            <strong>{vehiculoList.length} vehiculos</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Una vez confirmada, no podrá realizar más cambios en esta lista.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Vehiculos en la lista:
          </Typography>
          <Stack spacing={1} sx={{ maxHeight: 200, overflow: "auto" }}>
            {vehiculoList.map((vehiculo, index) => (
              <Box
                key={vehiculo.id}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Typography variant="body2">
                  {index + 1}.{" "}
                  <strong>{vehiculo.tipoVehiculo.label.toUpperCase()}</strong>
                  {"- Numero de Interno: "}
                  <strong>{vehiculo.numInterno}</strong>
                </Typography>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => setShowConfirmDialog(false)}
            variant="outlined"
            fullWidth={isMobile}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDialogAccept}
            variant="contained"
            color="primary"
            fullWidth={isMobile}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Vehiculo Dialog */}
      <Dialog
        open={showAddDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleCreateNewVehiculo)}>
            <DialogTitle sx={{ pb: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant={isMobile ? "h6" : "h5"}>
                  Agregar Vehiculo
                </Typography>
                {fullScreen && (
                  <IconButton onClick={handleCloseDialog} size="small">
                    <CloseIcon />
                  </IconButton>
                )}
              </Stack>
            </DialogTitle>
            <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
              <Stack spacing={2}>
                <RHFRadioGroup<VehiculosSchema>
                  name="tipoVehiculo"
                  label="Tipo de Vehiculo"
                  options={useTipoVehiculo().data}
                />
                <TextField
                  name="numInterno"
                  label="Número Interno"
                  fullWidth
                  size={isMobile ? "medium" : "small"}
                  inputRef={methods.register("numInterno").ref}
                  error={!!methods.formState.errors.numInterno}
                  helperText={
                    methods.formState.errors.numInterno?.message ||
                    "Número interno del vehiculo"
                  }
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: isMobile ? 2 : 3, gap: 1 }}>
              <Button
                onClick={handleCloseDialog}
                variant="outlined"
                fullWidth={isMobile}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={createVehiculoMutation.isPending}
                startIcon={<AddIcon />}
                fullWidth={isMobile}
              >
                {createVehiculoMutation.isPending
                  ? "Creando..."
                  : "Crear y Agregar"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* Details Dialog */}
      <VehiculoDetailsDialog
        open={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        vehiculo={selectedVehiculo}
      />
      {/* Delete Confirmation Dialog */}
      <VehiculoDeleteDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        vehiculo={selectedVehiculo}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{
            // lift it above the content
            zIndex: (theme) => theme.zIndex.snackbar + 1,
            // give a tiny backdrop blur
            backdropFilter: "blur(4px)",
            width: "100%",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
