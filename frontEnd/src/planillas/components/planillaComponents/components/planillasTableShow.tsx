"use client";

import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Business,
  Visibility,
  FlightTakeoff,
  FlightLand,
  AccessTime,
} from "@mui/icons-material";

import { ProcessedPlanillaData } from "../../../types/searchTypes";

interface PlanillasTableProps {
  planillas: ProcessedPlanillaData[];
  onView: (id: string) => void;
}

export const PlanillasTable: React.FC<PlanillasTableProps> = ({
  planillas,
  onView,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const getFlightTypeIcon = (
    horaArribo: string | undefined,
    horaPartida: string | undefined
  ): React.ReactElement => {
    if (horaArribo && horaPartida) return <FlightTakeoff color="primary" />;
    if (horaArribo) return <FlightLand color="success" />;
    if (horaPartida) return <FlightTakeoff color="warning" />;
    return <AccessTime color="disabled" />;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
      <Table size={isTablet ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
              Fecha
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Business fontSize="small" />
                <span>Empresa</span>
              </Stack>
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
              Código de Vuelo
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
              Horarios
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
              Posición
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
              Novedades
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planillas.map((planilla) => (
            <TableRow
              key={planilla.id}
              hover
              sx={{ "&:hover": { backgroundColor: "action.hover" } }}
            >
              <TableCell sx={{ textAlign: "center" }}>
                <Typography variant="body2" fontWeight="medium">
                  {planilla.formattedDate}
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Business fontSize="small" color="primary" />
                  <Typography variant="body2">{planilla.empresa}</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Chip
                  label={planilla.codVuelo}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Stack spacing={0.5}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {getFlightTypeIcon(
                      planilla.datosVuelo.horaArribo,
                      planilla.datosVuelo.horaPartida
                    )}
                    <Typography variant="caption">
                      {planilla.formattedHoraIni} - {planilla.formattedHoraFin}
                    </Typography>
                  </Stack>
                  {planilla.datosVuelo.horaArribo && (
                    <Typography variant="caption" color="success.main">
                      Arribo: {planilla.formattedHoraArribo}
                    </Typography>
                  )}
                  {planilla.datosVuelo.horaPartida && (
                    <Typography variant="caption" color="warning.main">
                      Partida: {planilla.formattedHoraPartida}
                    </Typography>
                  )}
                </Stack>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Chip
                  label={planilla.datosVuelo.posicion || "N/A"}
                  size="small"
                  variant="filled"
                  color="secondary"
                />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {planilla.novedadesCount > 0 ? (
                  <Chip
                    label={`${planilla.novedadesCount} novedad${
                      planilla.novedadesCount > 1 ? "es" : ""
                    }`}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    Sin novedades
                  </Typography>
                )}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title="Ver planilla">
                  <IconButton
                    size="small"
                    onClick={() => onView(planilla.id)}
                    color="primary"
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
