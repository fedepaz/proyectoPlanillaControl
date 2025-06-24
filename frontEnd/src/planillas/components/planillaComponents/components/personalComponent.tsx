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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePersonalEmpresaBusqueda } from "../../../services/queries";
import {
  defaultValuesPersonalEmpresa,
  PersonalEmpresaSchema,
  personalEmpresaSchema,
  PersonalEmpresaSchemaInput,
} from "../../../types/apiSchema";
import { BasePersonalOption } from "../../../../types/option";
import { useCreatePersonalEmpresa } from "../../../services/mutations";
import { useAppError } from "../../../../hooks/useAppError";
import { RHFTextField } from "../../../../components/RHFTextField";
import { AxiosError } from "axios";
import { CompactPersonalCard } from "../../../../components/EmpleadoCard";
import { PersonalDeleteDialog } from "../../../../components/PersonalDeleteDialog";
import { PersonalDetailsDialog } from "../../../../components/PersonalDetailsDialog";
import { PersonalTableDetails } from "../../../../components/PersonalTableDetails";

interface PersonalComponentProps {
  onPersonalListChange: (personalList: BasePersonalOption[]) => void;
  empresaId: string;
  maxPersonalList?: number;
  minPersonalList?: number;
}

export function PersonalComponent({
  onPersonalListChange,
  empresaId,
  maxPersonalList = 10,
  minPersonalList = 3,
}: PersonalComponentProps) {
  const [personalList, setPersonalList] = useState<BasePersonalOption[]>([]);
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
        `No puedes agregar mas de ${maxPersonalList} empleados terrestres`,
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
          empresaId: personal.empresaId,
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
      showSnackbar("Empleado terrestre agregada exitosamente", "success");
    }
  };

  const handleCreateNewPersonal = (data: PersonalEmpresaSchemaInput) => {
    const transformedData: PersonalEmpresaSchema = {
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
          empresaId: newPersonal.empresa,
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
        setSnackbarOpen(true);
        setSnackbarMessage("Empleado terrestre agregado exitosamente");
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

  const handleConfirmDelete = () => {
    if (selectedPersonal) {
      const newList = personalList.filter((p) => p.id !== selectedPersonal.id);
      setPersonalList(newList);
      onPersonalListChange(newList);
      setShowDeleteDialog(false);
      setSelectedPersonal(null);
      showSnackbar(
        `${selectedPersonal.firstname} ${selectedPersonal.lastname} eliminado exitosamente`,
        "success"
      );
    }
  };

  const handleDelete = (personal: BasePersonalOption) => {
    if (personal) {
      const newList = personalList.filter((p) => p.id !== personal.id);
      setPersonalList(newList);
      onPersonalListChange(newList);
      setShowDeleteDialog(false);
      setSelectedPersonal(null);
      showSnackbar(
        `${personal.firstname} ${personal.lastname} eliminado exitosamente`,
        "success"
      );
    }
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
            Personal de Empresa
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
              disabled={personalList.length >= maxPersonalList}
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
              disabled={isSearching || !searchDni.trim()}
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

          <Box mt={2}>
            <Chip
              label={countMessage}
              color={isValidCount ? "success" : "warning"}
              variant={isValidCount ? "filled" : "outlined"}
              size={isMobile ? "small" : "medium"}
            />
          </Box>
        </CardContent>
      </Card>

      {foundPersonal && (
        <Card sx={{ bgcolor: "success.light", color: "success.contrastText" }}>
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
                  onDelete={handleDelete}
                />
              ))}
            </Box>
          ) : (
            <PersonalTableDetails
              personalList={personalList}
              onDelete={handleDelete}
            />
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
              No hay empleados terrestres
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              color="text.secondary"
            >
              Busque por DNI para agregar un empleado terrestre
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
