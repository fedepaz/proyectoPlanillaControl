"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { VehiculoOption } from "../types/option";

interface VehiculoDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  vehiculo: VehiculoOption | null;
}

export function VehiculoDetailsDialog({
  open,
  onClose,
  vehiculo,
}: VehiculoDetailsDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  if (!vehiculo) return null;

  const empresaName =
    typeof vehiculo.empresa === "object" && vehiculo.empresa !== null
      ? vehiculo.empresa.empresa || vehiculo.empresa.id || "N/A"
      : vehiculo.empresa || "N/A";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={fullScreen}>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant={isMobile ? "h6" : "h5"}>
            Detalles del Vehiculo
          </Typography>
          {fullScreen && (
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Tipo de Vehiculo
            </Typography>
            <Typography variant="body1">
              {vehiculo.tipoVehiculo.label.toUpperCase()}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Empresa
            </Typography>
            <Typography variant="body1">{empresaName}</Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Número Interno
            </Typography>
            <Typography variant="body1">{vehiculo.numInterno}</Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: isMobile ? 2 : 3 }}>
        <Button onClick={onClose} variant="contained" fullWidth={isMobile}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
