"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
  CheckCircle,
  Save,
  DirectionsCar,
  AirportShuttle,
  Build,
  Agriculture,
} from "@mui/icons-material";
import type { VehiculoOption, BasePersonalOption } from "../types/option";
import { PersonalOneComponent } from "../planillas/components/planillaComponents/components/personalOneComponent";

interface VehiculoWithOperator {
  vehiculo: string;
  operadorVehiculo: string;
  isObservaciones: boolean;
  observacionesVehiculo?: string;
}

interface OperatorAndObservationsSelectionProps {
  vehiculoList: VehiculoOption[];
  onPersonalAssignment: (
    vehiculosWithOperators: VehiculoWithOperator[]
  ) => void;
  title?: string;
  empresaId: string;
  requireObservations?: boolean;
}

export const OperatorAndObservationsSelection: React.FC<
  OperatorAndObservationsSelectionProps
> = ({
  vehiculoList,
  onPersonalAssignment,
  title = "Asignar Operadores y Observaciones",
  empresaId,
  requireObservations = false,
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
    const assignedVehicles = Object.keys(assignments).filter(
      (vehicleId) => assignments[vehicleId] !== null
    );
    const allVehiclesAssigned =
      assignedVehicles.length === vehiculoList.length &&
      vehiculoList.length > 0;

    // Check observations if required
    let observationsComplete = true;
    if (requireObservations) {
      observationsComplete = vehiculoList.every((vehicle) => {
        const hasObservation = observationFlags[vehicle.id];
        return (
          !hasObservation ||
          (hasObservation && observations[vehicle.id]?.trim())
        );
      });
    }

    setHasChanges(allVehiclesAssigned && observationsComplete);
  }, [
    assignments,
    observations,
    observationFlags,
    vehiculoList.length,
    requireObservations,
    vehiculoList,
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

    // Auto-collapse when operator is assigned
    if (personal) {
      setExpandedVehicles((prev) => {
        const newExpanded = new Set(prev);
        newExpanded.delete(vehicleId);
        return newExpanded;
      });
    }
  };

  const handleObservationChange = (vehicleId: string, observation: string) => {
    setObservations((prev) => ({
      ...prev,
      [vehicleId]: observation,
    }));
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

    console.log("Vehicle assignments:", vehiculosWithOperators);
    onPersonalAssignment(vehiculosWithOperators);
  };

  const getAssignmentSummary = () => {
    const assignedCount = Object.values(assignments).filter(
      (assignment) => assignment !== null
    ).length;
    return { assignedCount, totalCount: vehiculoList.length };
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
        borderColor: theme.palette.primary.main,
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
            <Assignment sx={{ color: theme.palette.primary.main }} />
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color="primary"
              fontWeight="600"
            >
              {title}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Chip
              label={`${assignedCount}/${totalCount} asignados`}
              size="small"
              color={assignedCount === totalCount ? "success" : "primary"}
              variant="filled"
            />
          </Box>
        </Box>

        {assignedCount === 0 && (
          <Alert severity="info" sx={{ mb: 2, fontSize: "0.875rem" }}>
            Seleccione un operador para cada vehículo
          </Alert>
        )}

        <Stack spacing={2}>
          {vehiculoList.map((vehicle) => {
            const isExpanded = expandedVehicles.has(vehicle.id);
            const assignedPersonal = assignments[vehicle.id];
            const hasAssignment = assignedPersonal !== null;
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
                    p: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => toggleExpanded(vehicle.id)}
                >
                  <Box sx={{ color: vehicleInfo.color, mr: 1 }}>
                    {vehicleInfo.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight="500">
                      {vehicle.tipoVehiculo.label.toUpperCase()}
                      {" - "}
                      {vehicle.numInterno}
                    </Typography>
                    {assignedPersonal && (
                      <Typography
                        variant="caption"
                        color="success.main"
                        sx={{ fontWeight: 500 }}
                      >
                        Operador: {assignedPersonal.firstname}{" "}
                        {assignedPersonal.lastname}
                      </Typography>
                    )}
                  </Box>

                  {/* Status indicators */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mr: 1,
                    }}
                  >
                    {hasAssignment && (
                      <CheckCircle color="success" fontSize="small" />
                    )}
                    {hasObservation && (
                      <Chip
                        label="Con observaciones"
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <IconButton size="small">
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>

                {/* Expanded Content */}
                <Collapse in={isExpanded}>
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Divider sx={{ mb: 2 }} />

                    {/* Personal Selection */}
                    <Box sx={{ mb: 2 }}>
                      <PersonalOneComponent
                        onPersonalChange={(personal) =>
                          handlePersonalChange(vehicle.id, personal)
                        }
                        empresaId={empresaId}
                        label={`Operador para ${vehicle.tipoVehiculo.label.toUpperCase()} ${
                          vehicle.numInterno
                        }`}
                        required={true}
                        initialPersonal={assignedPersonal}
                      />
                    </Box>

                    {/* Observations Section */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={hasObservation}
                            onChange={(e) =>
                              handleObservationFlagChange(
                                vehicle.id,
                                e.target.checked
                              )
                            }
                            color="primary"
                          />
                        }
                        label="Agregar observaciones"
                        sx={{ mb: hasObservation ? 1 : 0 }}
                      />

                      {hasObservation && (
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Observaciones del vehículo"
                          value={observations[vehicle.id] || ""}
                          onChange={(e) =>
                            handleObservationChange(vehicle.id, e.target.value)
                          }
                          placeholder="Ingrese observaciones sobre el vehículo o su operación..."
                          size="small"
                          required={requireObservations}
                          error={
                            requireObservations &&
                            hasObservation &&
                            !observations[vehicle.id]?.trim()
                          }
                          helperText={
                            requireObservations &&
                            hasObservation &&
                            !observations[vehicle.id]?.trim()
                              ? "Las observaciones son requeridas"
                              : ""
                          }
                        />
                      )}
                    </Box>
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

        {/* Debug section */}
        <Box>
          <strong>Debug Info:</strong>
          <br />
          Assigned: {assignedCount}/{totalCount}
          <br />
          Has Changes: {hasChanges.toString()}
          <br />
          Assignments:{" "}
          {JSON.stringify(
            Object.keys(assignments).filter((k) => assignments[k])
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
