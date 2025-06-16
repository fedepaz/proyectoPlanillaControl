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
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import {
  useEmpresaId,
  usePersonalEmpresa,
  usePersonalEmpresaBusqueda,
} from "../../../services/queries";
import {
  defaultValuesPersonalEmpresa,
  PersonalEmpresaSchema,
  personalEmpresaSchema,
} from "../../../types/apiSchema";
import { RHFTextField } from "../../../../components/RHFTextField";
import { PersonalEmpresaOption } from "../../../../types/option";
import { useCreatePersonalEmpresa } from "../../../services/mutations";

interface PersonalComponentProps {
  onPersonalSelected: (
    lastname: string,
    firstname: string,
    dni: number,
    legajo: number
  ) => void;
  empresaId: string;
  dni?: number;
}

export function PersonalComponent({
  onPersonalSelected,
  empresaId,
  dni,
}: PersonalComponentProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newDniNumber, setNewDniNumber] = useState("");
  const [selectedPersonal, setSelectedPersonal] =
    useState<PersonalEmpresaOption | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { setError } = useAppError();

  const empresaQuery = useEmpresaId(empresaId);

  const methods = useForm<PersonalEmpresaSchema>({
    resolver: zodResolver(personalEmpresaSchema),
    defaultValues: {
      ...defaultValuesPersonalEmpresa,
      empresa: empresaId,
    },
    mode: "onChange",
  });
  const { watch, setValue } = methods;
  const personalWatch = watch("dni");

  useEffect(() => {
    setValue("dni", "");
    setSelectedPersonal(null);
    onPersonalSelected("");
  }, [empresaId, onPersonalSelected, setValue]);

  const params = empresaId && dni ? { dni: dni, empresa: empresaId } : null;
  const personalQuery = usePersonalEmpresa(params);
  const createPersonalMutation = useCreatePersonalEmpresa();

  const personalOptions: PersonalEmpresaOption = useMemo(
    () =>
      personalQuery.data?.map((item) => ({
        id: item.id,
        dni: item.dni,
        firstname: item.firstname,
        lastname: item.lastname,
        empresaId: item.empresa,
        legajo: item.legajo,
        isUserCreated: item.isUserCreated,
        createdAt: item.createdAt,
        needsValidation: item.needsValidation,
      })) || [],
    [personalQuery.data]
  );

  useEffect(() => {
    if (personalWatch) {
      const selected = personalOptions.find(
        (option) => option.id === personalWatch
      );
      setSelectedPersonal(selected || null);
      onPersonalSelected(personalWatch);
    }
  }, [personalWatch, personalOptions, onPersonalSelected, setValue]);

  useEffect(() => {
    if (personalQuery.error) {
      setError(personalQuery.error);
    }
  }, [personalQuery.error, setError]);

  useEffect(() => {
    if (createPersonalMutation.error) {
      setError(createPersonalMutation.error);
    }
  }, [createPersonalMutation.error, setError]);

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

  const handleCreateNewPersonal = () => {
    if (!newDniNumber.trim()) return;
    const newPersonal: PersonalEmpresaSchema = {
      dni: newDniNumber.toUpperCase(),
      firstname: "",
      lastname: "",
      empresa: empresaId,
      legajo: 0,
    };

    createPersonalMutation.mutate(newPersonal, {
      onSuccess: (data) => {
        setValue("dni", data.id);
        setOpenDialog(false);
        setNewDniNumber("");
        onPersonalSelected(data.id);

        const newOption: PersonalEmpresaOption = {
          id: data.id,
          dni: data.dni,
          firstname: data.firstname,
          lastname: data.lastname,
          empresaId: data.empresa,
          legajo: data.legajo,
        };
        setSelectedPersonal(newOption);
        setSnackbarOpen(true);
      },
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewDniNumber("");
  };

  const handleClearSelection = () => {
    setValue("dni", "");
    setSelectedPersonal(null);
    onPersonalSelected("");
  };

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        {!selectedPersonal && (
          <RHFDropDownPersonalEmpresa<PersonalEmpresaSchema>
            name="dni"
            options={personalQuery.data}
            label={displayLabel}
            onAddNew={() => setOpenDialog(true)}
          />
        )}
        {selectedPersonal && (
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
                    Personal Seleccionada
                  </Typography>
                </Box>
                <IconButton size="small" onClick={handleClearSelection}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {selectedPersonal.dni}
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
              Agregar nuevo DNI
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
            Ingrese el DNI
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="DNI"
            fullWidth
            value={newDniNumber}
            onChange={(e) => setNewDniNumber(e.target.value)}
            variant="outlined"
            helperText="DNI"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
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
            onClick={handleCreateNewPersonal}
            disabled={!newDniNumber.trim() || createPersonalMutation.isPending}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              minWidth: 100,
              minHeight: 44,
            }}
          >
            {createPersonalMutation.isPending ? "Agregando..." : "Agregar"}
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
          ¡DNI agregado exitosamente!
        </Alert>
      </Snackbar>
    </FormProvider>
  );
}
