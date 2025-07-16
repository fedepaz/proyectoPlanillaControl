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
  Chip,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Grid,
} from "@mui/material";
import {
  Close,
  Flight,
  Person,
  DirectionsCar,
  Assignment,
  Warning,
  Info,
} from "@mui/icons-material";
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

  const renderNovedades = () => {
    const novedades = [];

    if (planilla.novEquipajes?.isRequired) {
      novedades.push({
        type: "Equipajes",
        observaciones: planilla.novEquipajes.observaciones,
      });
    }

    if (planilla.novInspeccion?.isRequired) {
      novedades.push({
        type: "Inspección",
        observaciones: planilla.novInspeccion.observaciones,
      });
    }

    if (planilla.novOtras?.isRequired) {
      novedades.push({
        type: "Otras",
        observaciones: planilla.novOtras.observaciones,
      });
    }

    return novedades.length > 0 ? (
      <InfoSection title="Novedades" icon={<Warning color="warning" />}>
        {novedades.map((novedad, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Chip
              label={novedad.type}
              size="small"
              color="warning"
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {novedad.observaciones || "Sin observaciones"}
            </Typography>
          </Box>
        ))}
      </InfoSection>
    ) : (
      <InfoSection title="Novedades" icon={<Info color="info" />}>
        <Typography variant="body2" color="text.secondary">
          No hay novedades registradas
        </Typography>
      </InfoSection>
    );
  };

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
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
            Planilla de Vuelo
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size={isMobile ? "small" : "medium"}
          sx={{ ml: 1 }}
        >
          <Close />
        </IconButton>
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
          <DataRow
            label="Cantidad de Oficiales"
            value={planilla.datosPsa.cant}
          />
          <DataRow
            label="Tipos de Control Realizados"
            value={planilla.datosPsa.tipoControl.length}
          />
          <DataRow
            label="Medios Técnicos Utilizados"
            value={planilla.datosPsa.medioTec.length}
          />
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

        {/* Personnel Information */}
        <InfoSection title="Personal" icon={<Person color="primary" />}>
          <DataRow
            label="Personal Handling"
            value={planilla.datosTerrestre.length}
          />
          <DataRow
            label="Personal de Seguridad"
            value={planilla.datosSeguridad.length}
          />
        </InfoSection>

        {/* Vehicles Information */}
        <InfoSection title="Vehículos" icon={<DirectionsCar color="primary" />}>
          <DataRow
            label="Vehículos Utilizados"
            value={planilla.datosVehiculos.length}
          />
        </InfoSection>

        {/* Novedades */}
        {renderNovedades()}

        {/* Summary */}
        <InfoSection title="Resumen" icon={<Info color="info" />}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <Chip
              label={`${planilla.novedadesCount} Novedades`}
              color={planilla.novedadesCount > 0 ? "warning" : "success"}
              size="small"
            />
          </Stack>
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
