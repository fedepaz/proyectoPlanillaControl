"use client";

import React from "react";
import {
  Typography,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FlightTakeoff, FlightLand, AccessTime } from "@mui/icons-material";
import { ProcessedPlanillaData } from "../../../types/searchTypes";

interface PlanillaMobileItemProps {
  planillas: ProcessedPlanillaData[];
  onView: (id: string) => void;
}

export const PlanillaMobileList: React.FC<PlanillaMobileItemProps> = ({
  planillas,
  onView,
}) => {
  const getFlightTypeIcon = (
    horaArribo: string | undefined,
    horaPartida: string | undefined
  ): React.ReactElement => {
    if (horaArribo && horaPartida)
      return <FlightTakeoff color="primary" fontSize="small" />;
    if (horaArribo) return <FlightLand color="success" fontSize="small" />;
    if (horaPartida) return <FlightTakeoff color="warning" fontSize="small" />;
    return <AccessTime color="disabled" fontSize="small" />;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        borderRadius: 2,
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                px: 1,
                fontSize: "0.8rem",
              }}
            >
              Fecha
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                px: 1,
                fontSize: "0.8rem",
              }}
            >
              Código
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                px: 1,
                fontSize: "0.8rem",
              }}
            >
              Horarios
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {planillas.map((planilla) => (
            <TableRow
              key={planilla.id}
              hover
              onClick={() => onView(planilla.id)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <TableCell sx={{ textAlign: "center", px: 1 }}>
                <Typography variant="caption" fontWeight="medium">
                  {planilla.formattedDate}
                </Typography>
              </TableCell>

              <TableCell sx={{ textAlign: "center", px: 1 }}>
                <Typography variant="caption" noWrap>
                  {planilla.codVuelo}
                </Typography>
              </TableCell>

              <TableCell sx={{ textAlign: "center", px: 1 }}>
                <Stack spacing={0.3} alignItems="center">
                  {getFlightTypeIcon(
                    planilla.datosVuelo.horaArribo,
                    planilla.datosVuelo.horaPartida
                  )}
                  {planilla.datosVuelo.horaArribo && (
                    <Typography variant="caption" color="success.main" noWrap>
                      {planilla.formattedHoraArribo}
                    </Typography>
                  )}
                  {planilla.datosVuelo.horaPartida && (
                    <Typography variant="caption" color="warning.main" noWrap>
                      {planilla.formattedHoraPartida}
                    </Typography>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
