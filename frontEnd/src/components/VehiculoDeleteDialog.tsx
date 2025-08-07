"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import DeleteIcon from "@mui/icons-material/Delete";
import type { VehiculoOption } from "../types/option";

interface VehiculoDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  vehiculo: VehiculoOption | null;
}
export function VehiculoDeleteDialog({
  open,
  onClose,
  onConfirm,
  vehiculo,
}: VehiculoDeleteDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!vehiculo) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" gap={1}>
          <DeleteIcon color="error" />
          <Typography variant="h6">Confirmar Eliminación</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography>
          ¿Está seguro que desea eliminar el vehiculo{" "}
          <strong>
            {vehiculo.tipoVehiculo.label.toUpperCase()} {vehiculo.numInterno}
          </strong>{" "}
          de la lista?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" fullWidth={isMobile}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          fullWidth={isMobile}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
