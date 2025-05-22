import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import FlightIcon from "@mui/icons-material/Flight";
import SecurityIcon from "@mui/icons-material/Security";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  defaultValuesEmpresa,
  EmpresaSchema,
  empresaSchema,
} from "../../../types/apiSchema";
import { useEmpresaTipoId } from "../../../services/queries";
import { RHFDropDownEmpresa } from "../../../../components/RHFDropDownEmpresa";
import { EmpresaOption } from "../../../../types/option";
import { useCreateEmpresa } from "../../../services/mutations";

interface EmpresaComponentProps {
  onEmpresaSelected: (tipoEmpresa: string) => void;
  tipoFijoID: string;
  label: string;
}

export function EmpresaComponent({
  onEmpresaSelected,
  tipoFijoID,
  label,
}: EmpresaComponentProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newEmpresaName, setNewEmpresaName] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const getDisplayInfo = () => {
    switch (label) {
      case "aerolinea":
        return {
          label: "Aerolínea",
          icon: <FlightIcon />,
          color: theme.palette.primary.main,
        };
      case "seguridad":
        return {
          label: label || "Empresa de Seguridad",
          icon: <SecurityIcon />,
          color: theme.palette.error.main,
        };
      case "limpieza":
        return {
          label: label || "Empresa de Limpieza",
          icon: <CleaningServicesIcon />,
          color: theme.palette.info.main,
        };
      case "handling":
        return {
          label: label || "Empresa de Handling",
          icon: <LocalShippingIcon />,
          color: theme.palette.warning.main,
        };
      default:
        return {
          label: label || "Empresa",
          icon: <BusinessIcon />,
          color: theme.palette.secondary.main,
        };
    }
  };

  const {
    label: displayLabel,
    icon: displayIcon,
    color: displayColor,
  } = getDisplayInfo();

  const methods = useForm<EmpresaSchema>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      ...defaultValuesEmpresa,
      tipoEmpresa: tipoFijoID,
    },
    mode: "onChange",
  });
  const { watch, setValue } = methods;
  const empresaWatch = watch("empresa");

  const empresaQuery = useEmpresaTipoId(tipoFijoID);

  // Transform empresa data to match EmpresaOption format
  const empresaOptions: EmpresaOption[] =
    empresaQuery.data?.map((item) => ({
      id: item.id,
      empresa: item.empresa,
    })) || [];

  const handleCreateNewEmpresa = () => {
    if (!newEmpresaName.trim()) return;
    const newEmpresa: EmpresaSchema = {
      empresa: newEmpresaName,
      tipoEmpresa: tipoFijoID,
    };
    const newEmpresaCreated = useCreateEmpresa();
    newEmpresaCreated.mutate(newEmpresa);
    setValue("empresa", newEmpresaName.id);
    setOpenDialog(false);
    setNewEmpresaName("");
    onEmpresaSelected(newEmpresaName.id);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setNewEmpresaName("");
  };

  useEffect(() => {
    if (empresaWatch) {
      onEmpresaSelected(empresaWatch);
    }
  }, [empresaWatch, onEmpresaSelected]);

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <RHFDropDownEmpresa<EmpresaSchema>
          name="empresa"
          options={empresaOptions}
          label={displayLabel}
          onAddNew={() => setOpenDialog(true)}
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
                bgcolor: `${displayColor}20`,
                color: displayColor,
              }}
            >
              {displayIcon}
            </Box>
            <Typography variant="h6" component="div">
              {`Agregar nueva ${displayLabel.toLowerCase()}`}
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
            {`Ingrese el nombre de la ${displayLabel.toLowerCase()} que desea agregar al sistema.`}
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={newEmpresaName}
            onChange={(e) => setNewEmpresaName(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{displayIcon}</InputAdornment>
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
            onClick={handleCreateNewEmpresa}
            disabled={!newEmpresaName.trim()}
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
