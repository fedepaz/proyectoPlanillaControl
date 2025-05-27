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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FlightIcon from "@mui/icons-material/Flight";
import {
  defaultValuesAeropuertos,
  AeropuertosSchema,
  aeropuertosSchema,
} from "../../../types/apiSchema";
import { useAeropuertos } from "../../../services/queries";
import { useCreateAeropuerto } from "../../../services/mutations";
import { AeropuertoOption } from "../../../../types/option";

interface AeropuertoComponentProps {
  onAeropuertoSelected: (aeropuerto: string) => void;
  label?: string;
}

export function AeropuertoComponent({
  onAeropuertoSelected,
  label = "Aeropuerto",
}: AeropuertoComponentProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newAeropuertoName, setNewAeropuertoName] = useState("");
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

  const handleCreateNewAeropuerto = () => {
    if (!newAeropuertoName.trim()) return;
    const newAeropuerto: AeropuertosSchema = {
      aeropuerto: newAeropuertoName.toUpperCase(),
      codIATA: codIATAWatch,
      codOACI: "",
    };

    createAeropuertoMutation.mutate(newAeropuerto, {
      onSuccess: (data) => {
        setValue("aeropuerto", data.id);
        setOpenDialog(false);
        setNewAeropuertoName("");
        onAeropuertoSelected(data.id);
      },
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewAeropuertoName("");
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
          getOptionLabel={(option) =>
            typeof option === "string"
              ? option
              : `${option.aeropuerto} (${option.codIATA})`
          }
          filterOptions={(options, { inputValue }) => {
            const searchTerm = inputValue.toLowerCase();
            return options.filter(
              (opt) =>
                opt.aeropuerto.toLowerCase().includes(searchTerm) ||
                opt.codIATA.toLowerCase().includes(searchTerm)
            );
          }}
          onInputChange={(_, value) => setInputValue(value)}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {
              // Handle free text input
              const existing = aeropuertoOptions.find(
                (opt) =>
                  opt.aeropuerto === newValue.toUpperCase() ||
                  opt.codIATA === newValue.toUpperCase()
              );
              if (existing) {
                setValue("aeropuerto", existing.id);
                onAeropuertoSelected(existing.id);
              } else {
                handleCreateNewAeropuerto();
              }
            } else if (newValue) {
              setValue("aeropuerto", newValue.id);
              onAeropuertoSelected(newValue.id);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar aeropuerto"
              helperText="Escriba el nombre o código IATA"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    <InputAdornment position="end">
                      <IconButton onClick={handleCreateNewAeropuerto}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />
          )}
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
            maxWidth: fullScreen ? "100%" : "auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid ${theme.palette.divider}",
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
              {`Agregar nuevo aeropuerto`}
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
            {`Ingrese el nombre del aeropuerto que no se encuentra en la lista`}
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={newAeropuertoName}
            onChange={(e) => setNewAeropuertoName(e.target.value)}
            variant="outlined"
            helperText="Ingresar nombre del aeropuerto que no se encuentra en la lista"
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
            sx={{ minWidth: 100 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateNewAeropuerto}
            disabled={!newAeropuertoName.trim()}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              minWidth: 100,
              ml: 1,
            }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
