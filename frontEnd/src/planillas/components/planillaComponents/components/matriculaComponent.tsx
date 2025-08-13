import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { EmpresaOption, MatriculaOption } from "../../../../types/option";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FlightIcon from "@mui/icons-material/Flight";
import TagIcon from "@mui/icons-material/Tag";
import {
  defaultValuesMatricula,
  matriculaAeronaveSchema,
  MatriculaAeronaveSchema,
} from "../../../types/apiSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppError } from "../../../../hooks/useAppError";
import { useMatriculaBusqueda, useEmpresaId } from "../../../services/queries";
import { useCreateMatricula } from "../../../services/mutations";
import { RHFDropDownMatricula } from "../../../../components/RHFDropDownMatricula";
import {
  useTheme,
  useMediaQuery,
  FormLabel,
  Stack,
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

interface MatriculaComponentProps {
  onMatriculaSelected: (matricula: string) => void;
  empresaId: string;
}

export function MatriculaComponent({
  onMatriculaSelected,
  empresaId,
}: MatriculaComponentProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newMatriculaFirst, setNewMatriculaFirst] = useState("");
  const [newMatriculaSecond, setNewMatriculaSecond] = useState("");
  const [selectedMatricula, setSelectedMatricula] =
    useState<MatriculaOption | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { setError } = useAppError();

  const empresaQuery = useEmpresaId(empresaId);

  const methods = useForm<MatriculaAeronaveSchema>({
    resolver: zodResolver(matriculaAeronaveSchema),
    defaultValues: {
      ...defaultValuesMatricula,
      empresa: empresaId,
    },
    mode: "onChange",
  });
  const { watch, setValue } = methods;
  const matriculaWatch = watch("matriculaAeronave");

  const params = empresaId ? { empresa: empresaId } : null;

  const matriculaQuery = useMatriculaBusqueda(params);
  const createMatriculaMutation = useCreateMatricula();

  const matriculaOptions: MatriculaOption[] = useMemo(
    () =>
      matriculaQuery.data?.map((item) => ({
        id: item.id,
        matriculaAeronave: item.matriculaAeronave,
        empresaId: item.empresaId,
      })) || [],
    [matriculaQuery.data]
  );

  useEffect(() => {
    if (matriculaWatch) {
      const selected = matriculaOptions.find(
        (option) => option.id === matriculaWatch
      );
      if (selectedMatricula?.id !== selected?.id) {
        setSelectedMatricula(selected || null);
        onMatriculaSelected(matriculaWatch);
      }
    }
  }, [
    matriculaWatch,
    matriculaOptions,
    onMatriculaSelected,
    selectedMatricula,
  ]);

  useEffect(() => {
    if (matriculaQuery.error) {
      setError(matriculaQuery.error);
    }
  }, [matriculaQuery.error, setError]);

  useEffect(() => {
    if (createMatriculaMutation.error) {
      setError(createMatriculaMutation.error);
    }
  }, [createMatriculaMutation.error, setError]);

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

  const handleCreateNewMatricula = () => {
    if (!newMatriculaFirst.trim() || !newMatriculaSecond.trim()) return;

    const newMatricula: MatriculaAeronaveSchema = {
      matriculaAeronave:
        newMatriculaFirst.toUpperCase() +
        "-" +
        newMatriculaSecond.toUpperCase(),
      empresa: empresaId,
    };

    createMatriculaMutation.mutate(newMatricula, {
      onSuccess: (data) => {
        setValue("matriculaAeronave", data.id);
        setOpenDialog(false);
        setNewMatriculaFirst("");
        setNewMatriculaSecond("");
        onMatriculaSelected(data.id);

        const newOption: MatriculaOption = {
          id: data.id,
          matriculaAeronave: data.matriculaAeronave,
          empresaId: data.empresa,
        };
        setSelectedMatricula(newOption);
        setSnackbarOpen(true);
      },
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewMatriculaFirst("");
    setNewMatriculaSecond("");
  };

  const handleClearSelection = () => {
    setValue("matriculaAeronave", "");
    setSelectedMatricula(null);
    onMatriculaSelected("");
  };

  return (
    <FormProvider {...methods}>
      <FormLabel>Matricula Aeronave</FormLabel>
      <Stack sx={{ gap: 1 }}>
        {!selectedMatricula && (
          <RHFDropDownMatricula<MatriculaAeronaveSchema>
            name="matriculaAeronave"
            options={matriculaQuery.data}
            label={displayLabel}
            onAddNew={() => setOpenDialog(true)}
          />
        )}
        {selectedMatricula && (
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
                    Matricula Seleccionada
                  </Typography>
                </Box>
                <IconButton size="small" onClick={handleClearSelection}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {selectedMatricula.matriculaAeronave}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <Chip
                  label={displayFullName}
                  size="small"
                  variant="outlined"
                  sx={{ bgcolor: `${displayColor}20`, color: displayColor }}
                />
              </Box>
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
              Agregar nueva Matrícula
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
            Ingrese la Matrícula separando con un guión (-). Ej: LV-PAZ
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              label="Matrícula"
              fullWidth
              value={newMatriculaFirst}
              onChange={(e) => setNewMatriculaFirst(e.target.value)}
              variant="outlined"
              helperText="Ej: lv"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 2 }}
            />
            <Typography variant="body2" color="text.secondary" paragraph>
              -
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              value={newMatriculaSecond}
              onChange={(e) => setNewMatriculaSecond(e.target.value)}
              variant="outlined"
              helperText="Ej: paz"
              sx={{ mt: 2 }}
            />
          </Box>
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
            onClick={handleCreateNewMatricula}
            disabled={
              !newMatriculaFirst.trim() ||
              !newMatriculaSecond.trim() ||
              createMatriculaMutation.isPending
            }
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              minWidth: 100,
              minHeight: 44,
            }}
          >
            {createMatriculaMutation.isPending ? "Agregando..." : "Agregar"}
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
          !Matricula agregado exitosamente!
        </Alert>
      </Snackbar>
    </FormProvider>
  );
}
