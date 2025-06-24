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
import type { BasePersonalOption } from "../types/option";
import { PersonalStatusChips } from "./PersonalStatusChips";

interface PersonalDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  personal: BasePersonalOption | null;
}

export function PersonalDetailsDialog({
  open,
  onClose,
  personal,
}: PersonalDetailsDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!personal) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={fullScreen}>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant={isMobile ? "h6" : "h5"}>
            Detalles del Empleado
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
              Nombre Completo
            </Typography>
            <Typography variant="body1">
              {personal.firstname} {personal.lastname}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              DNI
            </Typography>
            <Typography variant="body1">{personal.dni}</Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Legajo
            </Typography>
            <Typography variant="body1">{personal.legajo}</Typography>
          </Box>

          <Box>
            <PersonalStatusChips personal={personal} direction="row" />
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
