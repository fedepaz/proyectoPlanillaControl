"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import type { BasePersonalOption } from "../types/option";

interface PersonalDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  personal: BasePersonalOption | null;
}

export function PersonalDeleteDialog({
  open,
  onClose,
  onConfirm,
  personal,
}: PersonalDeleteDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!personal) return null;

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
          ¿Está seguro que desea eliminar a{" "}
          <strong>
            {personal.firstname} {personal.lastname}
          </strong>{" "}
          (DNI: {personal.dni}) de la lista?
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
