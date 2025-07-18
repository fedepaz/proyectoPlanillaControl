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
  Chip,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePersonalSeguridadBusqueda } from "../../../services/queries";
import {
  defaultValuesPersonalSeguridad,
  personalSeguridadSchema,
  PersonalSeguridadSchema,
  PersonalSeguridadSchemaInput,
} from "../../../types/apiSchema";
import { BasePersonalOption } from "../../../../types/option";
import { useCreatePersonalSeguridad } from "../../../services/mutations";
import { useAppError } from "../../../../hooks/useAppError";
import { RHFTextField } from "../../../../components/RHFTextField";
import { AxiosError } from "axios";
import { CompactPersonalCard } from "../../../../components/EmpleadoCard";
import { PersonalDeleteDialog } from "../../../../components/PersonalDeleteDialog";
import { PersonalDetailsDialog } from "../../../../components/PersonalDetailsDialog";
import { PersonalTableDetails } from "../../../../components/PersonalTableDetails";

interface PersonalSeguridadComponentProps {
  onPersonalListChange: (personalList: BasePersonalOption[]) => void;
  onPersonalListConfirm?: (personalList: BasePersonalOption[]) => void;
  empresaId: string;
  maxPersonalList?: number;
  minPersonalList?: number;
  requireConfirmation?: boolean;
  initialPersonalList?: BasePersonalOption[];
}

export function PersonalSeguridadComponent({
  onPersonalListChange,
  onPersonalListConfirm,
  empresaId,
  maxPersonalList = 10,
  minPersonalList = 3,
  requireConfirmation = false,
  initialPersonalList = [],
}: PersonalSeguridadComponentProps) {
  const [personalList, setPersonalList] =
    useState<BasePersonalOption[]>(initialPersonalList);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [searchDni, setSearchDni] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundPersonal, setFoundPersonal] = useState<BasePersonalOption | null>(
    null
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPersonal, setSelectedPersonal] =
    useState<BasePersonalOption | null>(null);
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

  const methods = useForm<PersonalSeguridadSchemaInput>({
    resolver: zodResolver(personalSeguridadSchema),
    defaultValues: {
      ...defaultValuesPersonalSeguridad,
      empresa: empresaId,
    },
    mode: "onChange",
  });

  const { reset: resetForm } = methods;
  const createPersonalMutation = useCreatePersonalSeguridad();

  const params =
    shouldSearch && empresaId && searchTriggerDni
      ? { dni: searchTriggerDni, empresa: empresaId }
      : null;
  const personalQuery = usePersonalSeguridadBusqueda(params);

  const handleSearch = () => {
    if (!searchDni || !searchDni.trim()) {
      showSnackbar("Por favor ingrese un DNI", "warning");
      return;
    }

    if (personalList.some((p) => p.dni.toString() === searchDni.toString())) {
      showSnackbar("El DNI ya está cargado", "warning");
      return;
    }

    if (personalList.length >= maxPersonalList) {
      showSnackbar(
        `No puedes agregar mas de ${maxPersonalList} empleados`,
        "warning"
      );
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
          ...defaultValuesPersonalSeguridad,
          dni: searchDni,
          empresa: empresaId,
        });
      }
      setIsSearching(false);
      setShouldSearch(false);
    }
  }, [
    personalQuery.data,
    isSearching,
    searchDni,
    resetForm,
    empresaId,
    shouldSearch,
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

  const handleAddFoundPersonal = () => {
    if (foundPersonal) {
      const newList = [...personalList, foundPersonal];
      setPersonalList(newList);
      onPersonalListChange(newList);
      setFoundPersonal(null);
      setSearchDni("");
      setIsConfirmed(false);
      showSnackbar("Empleado agregado exitosamente", "success");
    }
  };

  const handleCreateNewPersonal = (data: PersonalSeguridadSchemaInput) => {
    const transformedData: PersonalSeguridadSchema = {
      dni: parseInt(data.dni.toString(), 10),
      firstname: data.firstname,
      lastname: data.lastname,
      empresa: data.empresa,
      legajo: parseInt(data.legajo.toString(), 10),
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
        const newList = [...personalList, personalData];
        setPersonalList(newList);
        onPersonalListChange(newList);
        setShowAddDialog(false);
        setSearchDni("");
        setFoundPersonal(null);
        setIsConfirmed(false);
        setSnackbarOpen(true);
        setSnackbarMessage("Empleado agregado exitosamente");
        setSnackbarSeverity("success");
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

  const handleDelete = (personal: BasePersonalOption) => {
    if (personal) {
      const newList = personalList.filter((p) => p.id !== personal.id);
      setPersonalList(newList);
      setIsConfirmed(false);
      showSnackbar(
        `${personal.firstname} ${personal.lastname} eliminado exitosamente`,
        "success"
      );
    }
  };

  const handleConfirmDelete = () => {
    if (selectedPersonal) {
      handleDelete(selectedPersonal);
      setShowDeleteDialog(false);
      setSelectedPersonal(null);
    }
  };

  const handleConfirmList = () => {
    if (requireConfirmation) {
      setShowConfirmDialog(true);
    } else {
      setIsConfirmed(true);
      onPersonalListConfirm?.(personalList);
      showSnackbar("Lista de empleados confirmada exitosamente", "success");
    }
  };

  const handleConfirmDialogAccept = () => {
    setIsConfirmed(true);
    setShowConfirmDialog(false);
    onPersonalListChange(personalList);
    onPersonalListConfirm?.(personalList);
    showSnackbar("Lista de empleados confirmada exitosamente", "success");
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
    setSearchDni("");
    setFoundPersonal(null);
  };

  const isValidCount =
    personalList.length >= minPersonalList &&
    personalList.length <= maxPersonalList;

  const canConfirm = isValidCount && personalList.length > 0 && !isConfirmed;

  const countMessage = `${personalList.length}/${maxPersonalList} empleados (mínimo ${minPersonalList})`;

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
            Personal de Seguridad
            {isConfirmed && <CheckCircleIcon color="success" />}
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
              disabled={personalList.length >= maxPersonalList || isConfirmed}
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
              disabled={isSearching || !searchDni.trim() || isConfirmed}
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
            <Chip
              label={countMessage}
              color={isValidCount ? "success" : "warning"}
              variant={isValidCount ? "filled" : "outlined"}
              size={isMobile ? "small" : "medium"}
            />
          </Stack>

          {isConfirmed && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Lista de empleados confirmada. {personalList.length} empleados
              seleccionados.
            </Alert>
          )}
        </CardContent>
      </Card>

      {foundPersonal && !isConfirmed && (
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
                onClick={handleAddFoundPersonal}
                startIcon={<AddIcon />}
                fullWidth={isMobile}
              >
                Agregar a la lista
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

      {/* Employee List - Mobile Cards or Desktop Table */}
      {personalList.length > 0 && (
        <>
          {isMobile ? (
            // Mobile: Card Layout
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Empleados Agregados ({personalList.length})
              </Typography>
              {personalList.map((personal) => (
                <CompactPersonalCard
                  personal={personal}
                  key={personal.id}
                  onDelete={isConfirmed ? undefined : handleDelete}
                  showActions={!isConfirmed}
                />
              ))}
            </Box>
          ) : (
            <PersonalTableDetails
              personalList={personalList}
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

      {personalList.length === 0 && (
        <Card sx={{ textAlign: "center", py: isMobile ? 3 : 4 }}>
          <CardContent>
            <PersonAddIcon
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
              No hay empleados seguridad
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              color="text.secondary"
            >
              Busque por DNI para agregar un empleado seguridad
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
            <Typography variant="h6">Confirmar Lista de Empleados</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            ¿Está seguro que desea confirmar la lista con{" "}
            <strong>{personalList.length} empleados</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Una vez confirmada, no podrá realizar más cambios en esta lista.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Empleados en la lista:
          </Typography>
          <Stack spacing={1} sx={{ maxHeight: 200, overflow: "auto" }}>
            {personalList.map((personal, index) => (
              <Box
                key={personal.id}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {isMobile ? (
                  <Typography variant="body2">
                    {index + 1}. {personal.lastname} - DNI: {personal.dni}
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    {index + 1}. {personal.firstname} {personal.lastname} - DNI:{" "}
                    {personal.dni}
                  </Typography>
                )}
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
                  Agregar Empleado seguridad
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
                  No se encontró ningún empleado de seguridad con el DNI{" "}
                  {searchDni}. Complete la información del nuevo empleado de
                  seguridad.
                </Alert>

                <RHFTextField<PersonalSeguridadSchema>
                  name="dni"
                  label="DNI"
                  disabled
                  type="text"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <RHFTextField<PersonalSeguridadSchema>
                  name="firstname"
                  label="Nombre"
                  required
                />
                <RHFTextField<PersonalSeguridadSchema>
                  name="lastname"
                  label="Apellido"
                  required
                />
                <RHFTextField<PersonalSeguridadSchema>
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
                  : "Crear y Agregar"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* Details Dialog */}
      <PersonalDetailsDialog
        open={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        personal={selectedPersonal}
      />
      {/* Delete Confirmation Dialog */}
      <PersonalDeleteDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        personal={selectedPersonal}
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
