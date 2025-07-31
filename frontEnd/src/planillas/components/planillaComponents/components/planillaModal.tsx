"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Grid,
} from "@mui/material";
import { Close, Flight, Assignment } from "@mui/icons-material";
import { ProcessedPlanillaData } from "../../../types/searchTypes";

interface PlanillaModalProps {
  open: boolean;
  planilla: ProcessedPlanillaData | null;
  onClose: () => void;
  onView: (planillaId: string) => void;
}

export const PlanillaModal: React.FC<PlanillaModalProps> = ({
  open,
  planilla,
  onClose,
  onView,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!planilla) return null;

  const InfoSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, icon, children }) => (
    <Paper
      elevation={isMobile ? 1 : 2}
      sx={{
        p: isMobile ? 2 : 3,
        mb: 2,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        {icon}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          color="primary"
        >
          {title}
        </Typography>
      </Stack>
      {children}
    </Paper>
  );

  const DataRow: React.FC<{ label: string; value: string | number }> = ({
    label,
    value,
  }) => (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={isMobile ? 5 : 4}>
        <Typography variant="body2" color="text.secondary" fontWeight="medium">
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={isMobile ? 7 : 8}>
        <Typography variant="body2" color="text.primary">
          {value}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          maxHeight: isMobile ? "100vh" : "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Planilla de Vuelo
          </Typography>
        </Box>
        <Button
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            size: "small",
          }}
          startIcon={<Close />}
        >
          Cerrar
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: isMobile ? 2 : 3 }}>
        {/* PSA Information */}
        <InfoSection
          title="Información PSA"
          icon={<Assignment color="primary" />}
        >
          <DataRow label="Fecha" value={planilla.formattedDate} />
          <DataRow
            label="Inicio de Control"
            value={planilla.formattedHoraIni}
          />
          <DataRow label="Fin de Control" value={planilla.formattedHoraFin} />
        </InfoSection>

        {/* Flight Information */}
        <InfoSection
          title="Información de Vuelo"
          icon={<Flight color="primary" />}
        >
          <DataRow label="Empresa" value={planilla.empresa} />
          <DataRow label="Código de Vuelo" value={planilla.codVuelo} />
          {planilla.datosVuelo.horaArribo && (
            <DataRow label="Arribo" value={planilla.formattedHoraArribo} />
          )}
          {planilla.datosVuelo.horaPartida && (
            <DataRow label="Partida" value={planilla.formattedHoraPartida} />
          )}
          <DataRow
            label="Posición Aeronave"
            value={planilla.datosVuelo.posicion}
          />
        </InfoSection>
      </DialogContent>

      <DialogActions
        sx={{
          p: isMobile ? 2 : 3,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          onClick={() => onView(planilla.id)}
          variant="contained"
          fullWidth={isMobile}
          size={isMobile ? "large" : "medium"}
        >
          Ver
        </Button>

        <Button
          onClick={onClose}
          variant="contained"
          fullWidth={isMobile}
          size={isMobile ? "large" : "medium"}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
