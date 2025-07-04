"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Collapse,
  IconButton,
  Alert,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Assignment,
  Save,
  DirectionsCar,
  AirportShuttle,
  Build,
  Agriculture,
  Edit,
} from "@mui/icons-material";
import type { VehiculoOption, BasePersonalOption } from "../types/option";
import { PersonalOneComponent } from "../planillas/components/planillaComponents/components/personalOneComponent";
import { NovedadesComponent } from "./NovedadesComponent";

interface VehiculoWithOperator {
  vehiculo: string;
  operadorVehiculo: string;
  isObservaciones: boolean;
  observacionesVehiculo: string;
}

interface OperatorAndObservationsSelectionProps {
  vehiculoList: VehiculoOption[];
  onPersonalAssignment: (
    vehiculosWithOperators: VehiculoWithOperator[]
  ) => void;
  title?: string;
  empresaId: string;
  requireObservations?: boolean;
  empresaColor?: string;
}

export const OperatorAndObservationsSelection: React.FC<
  OperatorAndObservationsSelectionProps
> = ({
  vehiculoList,
  onPersonalAssignment,
  title = "Asignar Operadores y Observaciones",
  empresaId,
  requireObservations = false,
  empresaColor = "primary.main",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [expandedVehicles, setExpandedVehicles] = useState<Set<string>>(
    new Set()
  );
  const [assignments, setAssignments] = useState<
    Record<string, BasePersonalOption | null>
  >({});
  const [observations, setObservations] = useState<Record<string, string>>({});
  const [observationFlags, setObservationFlags] = useState<
    Record<string, boolean>
  >({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Vehicle icon helper
  const getVehiculoIcon = (tipoVehiculo: string) => {
    switch (tipoVehiculo.toLowerCase()) {
      case "carro":
        return { icon: <AirportShuttle />, color: theme.palette.primary.main };
      case "cinta":
        return { icon: <Build />, color: theme.palette.primary.main };
      case "tractor":
        return { icon: <Agriculture />, color: theme.palette.primary.main };
      default:
        return { icon: <DirectionsCar />, color: theme.palette.grey[600] };
    }
  };

  // Check if all required assignments are complete
  useEffect(() => {
    if (vehiculoList.length === 0) {
      setHasChanges(false);
      return;
    }

    // Check if all vehicles have operators assigned
    const assignedVehicles = vehiculoList.filter(
      (vehicle) =>
        assignments[vehicle.id] !== null &&
        assignments[vehicle.id] !== undefined
    );
    const allVehiclesAssigned = assignedVehicles.length === vehiculoList.length;

    // Check observations requirement
    let observationsValid = true;
    if (requireObservations) {
      // If observations are required globally, every vehicle with observation flag must have text
      observationsValid = vehiculoList.every((vehicle) => {
        const hasObservationFlag = observationFlags[vehicle.id];
        return (
          !hasObservationFlag ||
          (hasObservationFlag && observations[vehicle.id]?.trim())
        );
      });
    } else {
      // If observations are not required globally, just check that enabled flags have text
      observationsValid = vehiculoList.every((vehicle) => {
        const hasObservationFlag = observationFlags[vehicle.id];
        return !hasObservationFlag || observations[vehicle.id]?.trim();
      });
    }

    const newHasChanges = allVehiclesAssigned && observationsValid;
    setHasChanges(newHasChanges);
  }, [
    assignments,
    observations,
    observationFlags,
    vehiculoList,
    requireObservations,
  ]);

  const toggleExpanded = (vehicleId: string) => {
    const newExpanded = new Set(expandedVehicles);
    if (newExpanded.has(vehicleId)) {
      newExpanded.delete(vehicleId);
    } else {
      newExpanded.add(vehicleId);
    }
    setExpandedVehicles(newExpanded);
  };

  const handlePersonalChange = (
    vehicleId: string,
    personal: BasePersonalOption | null
  ) => {
    setAssignments((prev) => ({
      ...prev,
      [vehicleId]: personal,
    }));
    setIsConfirmed(false);
  };

  const handleObservationChange = (vehicleId: string, observation: string) => {
    setObservations((prev) => ({
      ...prev,
      [vehicleId]: observation,
    }));

    // Reset confirmed state when changes are made
    setIsConfirmed(false);
  };

  const handleObservationFlagChange = (
    vehicleId: string,
    hasObservation: boolean
  ) => {
    setObservationFlags((prev) => ({
      ...prev,
      [vehicleId]: hasObservation,
    }));

    // Clear observation text if flag is disabled
    if (!hasObservation) {
      setObservations((prev) => ({
        ...prev,
        [vehicleId]: "",
      }));
    }

    // Reset confirmed state when changes are made
    setIsConfirmed(false);
  };

  const handleConfirmAssignments = () => {
    const vehiculosWithOperators: VehiculoWithOperator[] = [];

    vehiculoList.forEach((vehicle) => {
      const assignedPersonal = assignments[vehicle.id];
      if (assignedPersonal) {
        vehiculosWithOperators.push({
          vehiculo: vehicle.id,
          operadorVehiculo: assignedPersonal.id,
          isObservaciones: observationFlags[vehicle.id] || false,
          observacionesVehiculo: observations[vehicle.id] || "",
        });
      }
    });

    onPersonalAssignment(vehiculosWithOperators);
    setHasChanges(false);
    setIsConfirmed(true);
  };

  const getAssignmentSummary = () => {
    const assignedCount = Object.values(assignments).filter(
      (assignment) => assignment !== null && assignment !== undefined
    ).length;

    return {
      assignedCount,
      totalCount: vehiculoList.length,
    };
  };

  const { assignedCount, totalCount } = getAssignmentSummary();

  if (vehiculoList.length === 0) {
    return (
      <Alert severity="info">
        <Typography variant="body2">
          No hay vehículos disponibles para asignar operadores.
        </Typography>
      </Alert>
    );
  }

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: empresaColor,
        bgcolor: "background.paper",
      }}
    >
      <CardContent sx={{ p: isMobile ? 2 : 3 }}>
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Assignment sx={{ color: empresaColor }} />
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color={empresaColor}
              fontWeight="600"
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {/* Initial instruction */}
        {assignedCount === 0 && (
          <Alert severity="info" sx={{ mb: 2, fontSize: "0.875rem" }}>
            Toca en cada vehículo para asignar su operador
          </Alert>
        )}

        <Stack spacing={1}>
          {vehiculoList.map((vehicle) => {
            const isExpanded = expandedVehicles.has(vehicle.id);
            const assignedPersonal = assignments[vehicle.id];
            const hasAssignment =
              assignedPersonal !== null && assignedPersonal !== undefined;
            const vehicleInfo = getVehiculoIcon(vehicle.tipoVehiculo.label);
            const hasObservation = observationFlags[vehicle.id] || false;

            return (
              <Card
                key={vehicle.id}
                variant="outlined"
                sx={{
                  border: hasAssignment ? "2px solid" : "1px solid",
                  borderColor: hasAssignment ? "success.main" : "divider",
                  bgcolor: hasAssignment ? "success.50" : "background.paper",
                }}
              >
                {/* Vehicle Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    cursor: "pointer",
                  }}
                  onClick={() => toggleExpanded(vehicle.id)}
                >
                  <Box sx={{ color: vehicleInfo.color, mr: 1 }}>
                    {vehicleInfo.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="500">
                      {vehicle.tipoVehiculo.label.toUpperCase()} -{" "}
                      {vehicle.numInterno}
                    </Typography>
                    {assignedPersonal && (
                      <Typography variant="caption" color="text.secondary">
                        Operador: {assignedPersonal.firstname}{" "}
                        {assignedPersonal.lastname}
                      </Typography>
                    )}
                  </Box>

                  {/* Assignment chips and edit indicator */}
                  {hasAssignment && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        mr: 1,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {hasObservation && (
                        <Chip
                          label="Con observaciones"
                          size="small"
                          color="warning"
                          variant="outlined"
                          sx={{ fontSize: "0.75rem", height: 20 }}
                        />
                      )}
                    </Box>
                  )}

                  <IconButton size="small">
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>

                {/* Expanded Content */}
                <Collapse in={isExpanded}>
                  <Box
                    sx={{
                      p: 1.5,
                      pt: 0,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {/* Personal Selection */}
                    <Box sx={{ mb: 2 }}>
                      <PersonalOneComponent
                        onPersonalChange={(personal) =>
                          handlePersonalChange(vehicle.id, personal)
                        }
                        empresaId={empresaId}
                        label="Selecciona operador"
                        required={true}
                        initialPersonal={assignedPersonal}
                      />
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Observations Section */}
                    <NovedadesComponent
                      isRequired={observationFlags[vehicle.id] || false}
                      observaciones={observations[vehicle.id] || ""}
                      onRequiredChange={(isRequired) =>
                        handleObservationFlagChange(vehicle.id, isRequired)
                      }
                      onObservacionesChange={(observaciones) =>
                        handleObservationChange(vehicle.id, observaciones)
                      }
                      switchLabel="Agregar observaciones"
                      textFieldLabel="Observaciones"
                      placeholder="Observaciones del vehículo..."
                      required={requireObservations}
                      rows={2}
                      size="small"
                    />
                  </Box>
                </Collapse>
              </Card>
            );
          })}
        </Stack>

        {/* Summary */}
        {assignedCount > 0 && (
          <Alert
            severity={assignedCount === totalCount ? "success" : "warning"}
            sx={{ mt: 2 }}
          >
            <Typography variant="body2">
              {assignedCount === totalCount
                ? `✓ Todos los vehículos tienen operadores asignados`
                : `${totalCount - assignedCount} vehículo${
                    totalCount - assignedCount > 1 ? "s" : ""
                  } sin asignar`}
            </Typography>
          </Alert>
        )}

        {/* Confirmation Button */}
        {hasChanges && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Una vez confirmada, no podrá realizar más cambios en esta lista.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Save />}
              onClick={handleConfirmAssignments}
              sx={{
                minWidth: 200,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Confirmar Asignaciones
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
