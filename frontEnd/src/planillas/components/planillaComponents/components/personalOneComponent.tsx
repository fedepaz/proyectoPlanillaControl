"use client";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  useTheme,
  useMediaQuery,
  Box,
  Chip,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import PersonIcon from "@mui/icons-material/Person";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePersonalEmpresaBusqueda } from "../../../services/queries";
import {
  defaultValuesPersonalEmpresa,
  type PersonalEmpresaSchema,
  personalEmpresaSchema,
  type PersonalEmpresaSchemaInput,
} from "../../../types/apiSchema";
import type { BasePersonalOption } from "../../../../types/option";
import { useCreatePersonalEmpresa } from "../../../services/mutations";
import { useAppError } from "../../../../hooks/useAppError";
import { RHFTextField } from "../../../../components/RHFTextField";
import { AxiosError } from "axios";

interface PersonalOneComponentProps {
  onPersonalChange: (personal: BasePersonalOption | null) => void;
  empresaId: string;
  label?: string;
  required?: boolean;
  initialPersonal?: BasePersonalOption | null;
}

export function PersonalOneComponent({
  onPersonalChange,
  empresaId,
  label = "Personal de Empresa",
  required = false,
  initialPersonal = null,
}: PersonalOneComponentProps) {
  const [selectedPersonal, setSelectedPersonal] =
    useState<BasePersonalOption | null>(initialPersonal);
  const [searchDni, setSearchDni] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundPersonal, setFoundPersonal] = useState<BasePersonalOption | null>(
    null
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  const { setError } = useAppError();
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchTriggerDni, setSearchTriggerDni] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const methods = useForm<PersonalEmpresaSchemaInput>({
    resolver: zodResolver(personalEmpresaSchema),
    defaultValues: {
      ...defaultValuesPersonalEmpresa,
      empresa: empresaId,
    },
    mode: "onChange",
  });

  const { reset: resetForm } = methods;
  const createPersonalMutation = useCreatePersonalEmpresa();

  const params =
    shouldSearch && empresaId && searchTriggerDni
      ? { dni: searchTriggerDni, empresa: empresaId }
      : null;
  const personalQuery = usePersonalEmpresaBusqueda(params);

  // Notify parent when selected personal changes
  useEffect(() => {
    onPersonalChange(selectedPersonal);
  }, [selectedPersonal, onPersonalChange]);

  const handleSearch = () => {
    if (!searchDni || !searchDni.trim()) {
      showSnackbar("Por favor ingrese un DNI", "warning");
      return;
    }

    if (
      selectedPersonal &&
      selectedPersonal.dni.toString() === searchDni.toString()
    ) {
      showSnackbar("Este empleado ya está seleccionado", "warning");
      return;
    }

    setIsSearching(true);
    setShouldSearch(true);
    setSearchTriggerDni(searchDni);
  };

  useEffect(() => {
    if (personalQuery.data !== undefined && shouldSearch && isSearching) {
      if (personalQuery.data) {
        const personal = personalQuery.data;
        setFoundPersonal({
          id: personal.id,
          dni: personal.dni,
          firstname: personal.firstname,
          lastname: personal.lastname,
          empresa: personal.empresa,
          legajo: personal.legajo,
          needsValidation: personal.needsValidation,
          isUserCreated: personal.isUserCreated,
        });
      } else {
        setFoundPersonal(null);
        setShowAddDialog(true);
        resetForm({
          ...defaultValuesPersonalEmpresa,
          dni: searchDni,
          empresa: empresaId,
        });
      }
      setIsSearching(false);
      setShouldSearch(false);
    }
  }, [
    personalQuery.data,
    shouldSearch,
    isSearching,
    resetForm,
    searchDni,
    empresaId,
  ]);

  useEffect(() => {
    if (personalQuery.error && shouldSearch) {
      setIsSearching(false);
      setShouldSearch(false);
      if (
        personalQuery.error instanceof AxiosError &&
        personalQuery.error.response
      ) {
        const error = personalQuery.error.response.data;
        if (error.name === "PersonalRegistrado") {
          showSnackbar(error.message, "warning");
          setTimeout(() => {
            setSearchDni("");
          }, 2000);
          return;
        }
      }
      setFoundPersonal(null);
      setError(personalQuery.error);
      setSearchTriggerDni("");
    }
  }, [personalQuery.error, shouldSearch, setError]);

  const handleSelectFoundPersonal = () => {
    if (foundPersonal) {
      setSelectedPersonal(foundPersonal);
      setFoundPersonal(null);
      setSearchDni("");
      showSnackbar("Empleado seleccionado exitosamente", "success");
    }
  };

  const handleCreateNewPersonal = (data: PersonalEmpresaSchemaInput) => {
    const transformedData: PersonalEmpresaSchema = {
      dni: Number.parseInt(data.dni.toString(), 10),
      firstname: data.firstname,
      lastname: data.lastname,
      empresa: data.empresa,
      legajo: Number.parseInt(data.legajo.toString(), 10),
    };

    createPersonalMutation.mutate(transformedData, {
      onSuccess: (newPersonal) => {
        const personalData: BasePersonalOption = {
          id: newPersonal.id,
          dni: newPersonal.dni,
          firstname: newPersonal.firstname,
          lastname: newPersonal.lastname,
          empresa: newPersonal.empresa,
          legajo: newPersonal.legajo,
          needsValidation: newPersonal.needsValidation,
          isUserCreated: newPersonal.isUserCreated,
        };

        setSelectedPersonal(personalData);
        setShowAddDialog(false);
        setSearchDni("");
        setFoundPersonal(null);
        showSnackbar("Empleado creado y seleccionado exitosamente", "success");
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          if (error.response.data.name === "PersonalRegistrado") {
            showSnackbar(error.response.data.message, "warning");
            setTimeout(() => {
              setShowAddDialog(false);
              setSearchDni("");
            }, 2000);
            return;
          }
        }
        setError(error);
      },
    });
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setSearchDni("");
    setFoundPersonal(null);
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning"
  ) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  };

  return (
    <Stack spacing={isMobile ? 2 : 3}>
      <Card>
        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PersonAddIcon />
            {label}
            {selectedPersonal && <CheckCircleIcon color="success" />}
          </Typography>

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            alignItems="stretch"
          >
            <TextField
              label="Buscar por DNI"
              value={searchDni}
              onChange={(e) => setSearchDni(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              disabled={!!selectedPersonal}
              fullWidth
              size={isMobile ? "medium" : "small"}
              type="text"
              inputRef={(input) => {
                if (personalQuery.error && shouldSearch && input) {
                  setTimeout(() => input.focus(), 100);
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isSearching || !searchDni.trim() || !!selectedPersonal}
              startIcon={<SearchIcon />}
              fullWidth={isMobile}
              sx={{
                minWidth: isMobile ? "auto" : 120,
                border:
                  personalQuery.error && shouldSearch
                    ? "1px solid red"
                    : "none",
              }}
            >
              {isSearching ? "Buscando..." : "Buscar"}
            </Button>
          </Stack>

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            alignItems="center"
            mt={2}
          >
            {required && !selectedPersonal && (
              <Chip
                label="Requerido"
                color="warning"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Found Personal Card - Appears right after main card, similar to PersonalComponent */}
      {foundPersonal && !selectedPersonal && (
        <Card sx={{ bgcolor: "info.light", color: "info.contrastText" }}>
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
              Empleado Encontrado
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
              <strong>Nombre: </strong> {foundPersonal.firstname}{" "}
              {foundPersonal.lastname}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
              <strong>DNI: </strong> {foundPersonal.dni}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
              <strong>Legajo: </strong> {foundPersonal.legajo}
            </Typography>
            <Stack direction={isMobile ? "column" : "row"} spacing={2} mt={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSelectFoundPersonal}
                startIcon={<AddIcon />}
                fullWidth={isMobile}
              >
                Seleccionar empleado
              </Button>
              <Button
                variant="outlined"
                onClick={() => setFoundPersonal(null)}
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

      {/* Selected Personal Display - Similar to PersonalComponent's list display */}
      {selectedPersonal && (
        <Card>
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 2 : 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon color="success" />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {selectedPersonal.firstname} {selectedPersonal.lastname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    DNI: {selectedPersonal.dni} | Legajo:{" "}
                    {selectedPersonal.legajo}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Empty State - Only show when no personal is selected and no search is active */}
      {!selectedPersonal && !foundPersonal && (
        <Card sx={{ textAlign: "center", py: isMobile ? 3 : 4 }}>
          <CardContent>
            <PersonIcon
              sx={{
                fontSize: isMobile ? 40 : 48,
                color: "text.secondary",
                mb: 2,
              }}
            />
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color="text.secondary"
              gutterBottom
            >
              No hay empleado seleccionado
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              color="text.secondary"
            >
              Busque por DNI para seleccionar un empleado
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Add New Personal Dialog */}
      <Dialog
        open={showAddDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleCreateNewPersonal)}>
            <DialogTitle sx={{ pb: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant={isMobile ? "h6" : "h5"}>
                  Agregar Empleado Terrestre
                </Typography>
                {fullScreen && (
                  <IconButton onClick={handleCloseDialog} size="small">
                    <CloseIcon />
                  </IconButton>
                )}
              </Stack>
            </DialogTitle>
            <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
              <Stack spacing={isMobile ? 2 : 3} sx={{ mt: 1 }}>
                <Alert
                  severity="info"
                  sx={{ fontSize: isMobile ? "0.875rem" : "1rem" }}
                >
                  No se encontró ningún empleado terrestre con el DNI{" "}
                  {searchDni}. Complete la información del nuevo empleado
                  terrestre.
                </Alert>

                <RHFTextField<PersonalEmpresaSchema>
                  name="dni"
                  label="DNI"
                  disabled
                  type="text"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <RHFTextField<PersonalEmpresaSchema>
                  name="firstname"
                  label="Nombre"
                  required
                />
                <RHFTextField<PersonalEmpresaSchema>
                  name="lastname"
                  label="Apellido"
                  required
                />
                <RHFTextField<PersonalEmpresaSchema>
                  name="legajo"
                  label="Legajo"
                  required
                  type="text"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
                disabled={createPersonalMutation.isPending}
                startIcon={<AddIcon />}
                fullWidth={isMobile}
              >
                {createPersonalMutation.isPending
                  ? "Creando..."
                  : "Crear y Seleccionar"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

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
            zIndex: (theme) => theme.zIndex.snackbar + 1,
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
