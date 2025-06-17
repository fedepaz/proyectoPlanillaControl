import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import DeleteIcon from "@mui/icons-material/Delete";
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
} from "../../../types/apiSchema";
import { PersonalEmpresaOption } from "../../../../types/option";
import { useCreatePersonalEmpresa } from "../../../services/mutations";
import { useAppError } from "../../../../hooks/useAppError";
import { RHFTextField } from "../../../../components/RHFTextField";

interface PersonalComponentProps {
  onPersonalListChange: (personalList: PersonalEmpresaOption[]) => void;
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
  const [personalList, setPersonalList] = useState<PersonalEmpresaOption[]>([]);
  const [searchDni, setSearchDni] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundPersonal, setFoundPersonal] =
    useState<PersonalEmpresaOption | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const { setError } = useAppError();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const methods = useForm<PersonalEmpresaSchema>({
    resolver: zodResolver(personalEmpresaSchema),
    defaultValues: {
      ...defaultValuesPersonalEmpresa,
      empresa: empresaId,
    },
    mode: "onChange",
  });

  const { reset: resetForm } = methods;
  const createPersonalMutation = useCreatePersonalEmpresa();

  console.log(empresaId);
  console.log(searchDni);
  const params =
    empresaId && searchDni ? { dni: searchDni, empresa: empresaId } : null;
  console.log(params);
  const personalQuery = usePersonalEmpresaBusqueda(params);
  console.log(personalQuery.data);

  const handleSearch = () => {
    console.log("busqueda");
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
  };

  useEffect(() => {
    if (personalQuery.data && isSearching) {
      if (personalQuery.data.length > 0) {
        const personal = personalQuery.data[0];
        setFoundPersonal({
          id: personal.id,
          dni: personal.dni,
          firstname: personal.firstname,
          lastname: personal.lastname,
          empresaId: personal.empresaId,
          legajo: personal.legajo,
        });
      } else {
        setFoundPersonal(null);
        setShowAddDialog(true);
        resetForm({
          ...defaultValuesPersonalEmpresa,
          dni: parseInt(searchDni),
          empresa: empresaId,
        });
      }
      setIsSearching(false);
    }
  }, [personalQuery.data, isSearching, searchDni, resetForm, empresaId]);

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

  const handleCreateNewPersonal = (data: PersonalEmpresaSchema) => {
    createPersonalMutation.mutate(data, {
      onSuccess: (newPersonal) => {
        const personalData: PersonalEmpresaOption = {
          id: newPersonal.id,
          dni: newPersonal.dni,
          firstname: newPersonal.firstname,
          lastname: newPersonal.lastname,
          empresaId: newPersonal.empresa,
          legajo: newPersonal.legajo,
        };
        const newList = [...personalList, personalData];
        setPersonalList(newList);
        onPersonalListChange(newList);
        setSnackbarOpen(true);
        setSnackbarMessage("Empleado terrestre agregado exitosamente");
        setSnackbarSeverity("success");
      },
      onError: (error) => {
        setError(error);
      },
    });
  };

  const handleRemovePersonal = (id: string) => {
    const newList = personalList.filter((p) => p.id !== id);
    setPersonalList(newList);
    onPersonalListChange(newList);
    showSnackbar("Empleado terrestre eliminado exitosamente", "success");
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
    <Stack spacing={3}>
      <Card>
        <CardContent
          sx={{
            pb: isMobile ? 2 : 3,
          }}
        >
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
            alignItems={isMobile ? "stretch" : "center"}
          >
            <TextField
              label="Buscar por DNI"
              value={searchDni}
              onChange={(e) => setSearchDni(e.target.value)}
              disabled={personalList.length >= maxPersonalList}
              fullWidth
              size={isMobile ? "medium  " : "small"}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isSearching}
              fullWidth={isMobile}
              sx={{
                minWidth: isMobile ? "auto" : 120,
              }}
              startIcon={<SearchIcon />}
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
        <Card
          sx={{
            bgcolor: "success.light",
            color: "success.contrastText",
          }}
        >
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
              <strong>Legjo: </strong> {foundPersonal.legajo}
            </Typography>
            <Stack direction={isMobile ? "column" : "row"} spacing={2} mt={2}>
              <Button
                variant="contained"
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
              >
                Cancelar
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {personalList.length > 0 && (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nombre</strong>
                </TableCell>
                <TableCell>
                  <strong>Apellido</strong>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  <strong>DNI</strong>
                </TableCell>
                <TableCell>
                  <strong>Legjo</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personalList.map((personal) => (
                <TableRow key={personal.id} hover>
                  <TableCell>
                    <Typography variant={isMobile ? "body2" : "body1"}>
                      {personal.firstname}
                    </Typography>
                    {/* Show DNI on mobile under the name */}
                    {isMobile && (
                      <Typography variant="caption" color="text.secondary">
                        DNI: {personal.dni}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant={isMobile ? "body2" : "body1"}>
                      {personal.lastname}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    <Typography variant={isMobile ? "body2" : "body1"}>
                      {personal.dni}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={isMobile ? "body2" : "body1"}>
                      {personal.legajo}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleRemovePersonal(personal.id)}
                      size={isMobile ? "small" : "medium"}
                      title="Eliminar"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {personalList.length === 0 && (
        <Card
          sx={{
            textAlign: "center",
            py: isMobile ? 3 : 4,
          }}
        >
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

      <Dialog
        open={showAddDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen} // Mobile-first: fullscreen on small devices
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

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
