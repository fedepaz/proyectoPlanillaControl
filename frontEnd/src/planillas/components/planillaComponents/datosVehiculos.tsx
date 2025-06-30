import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  useTheme,
  Stack,
  Divider,
  Alert,
  Button,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import { useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../../types/planillaSchema";
import { EmpresaOption, VehiculoOption } from "../../../types/option";
import { usePersonalHandlingEmpresa } from "../../services/queries";
import { HelperTextWarning } from "../../../components/WarningChip";
import { VehiculoComponent } from "./components/vehiculoComponent";
import { OperatorAndObservationsSelection } from "../../../components/OperatorAndObservationsSelection";

interface PersonalWithFunction {
  personalEmpresa: string;
  funcion: string;
  grupo: string;
}

interface VehiculoWithOperator {
  vehiculo: string;
  operadorVehiculo: string;
  isObservaciones: boolean;
  observacionesVehiculo: string;
}

export function DatosVehiculos() {
  const { watch, setValue } = useFormContext<PlanillaSchema>();
  const datosTerrestre = watch("datosTerrestre.0") as PersonalWithFunction;
  const datosVehiculos = watch("datosVehiculos") as VehiculoWithOperator[];
  const label = "handling";

  const theme = useTheme();
  const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaOption | null>(
    null
  );
  const [currentVehiculoList, setCurrentVehiculoList] = useState<
    VehiculoOption[]
  >([]);
  const [confirmedVehiculoList, setConfirmedVehiculoList] = useState<
    VehiculoOption[]
  >([]);
  const [isVehiculosConfirmed, setIsVehiculosConfirmed] = useState(false);
  const [isOperatorsAssigned, setIsOperatorsAssigned] = useState(false);

  const { data } = usePersonalHandlingEmpresa(datosTerrestre?.personalEmpresa);

  useEffect(() => {
    if (!data) {
      setSelectedEmpresa(null);
    } else {
      setSelectedEmpresa(data.empresa);
    }
  }, [data]);

  useEffect(() => {
    if (datosVehiculos && datosVehiculos.length > 0) {
      setIsOperatorsAssigned(true);
    } else {
      setIsOperatorsAssigned(false);
    }
  }, [datosVehiculos]);

  const getDisplayInfo = () => {
    switch (label) {
      case "handling":
        return {
          label: "Handling",
          icon: <LocalShippingIcon />,
          color: theme.palette.warning.main,
        };
      default:
        return {
          label: label || "Empresa",
          icon: <BusinessIcon />,
          color: theme.palette.secondary.main,
        };
    }
  };

  const {
    label: displayLabel,
    icon: displayIcon,
    color: displayColor,
  } = getDisplayInfo();

  if (selectedEmpresa === null) {
    return (
      <Stack sx={{ gap: 1 }}>
        <Typography variant="body2">No Hay Empresa Seleccionada</Typography>
      </Stack>
    );
  }
  const handlePersonalAssignment = (
    vehiculosWithOperators: VehiculoWithOperator[]
  ) => {
    if (!vehiculosWithOperators || vehiculosWithOperators.length === 0) {
      setIsOperatorsAssigned(false);
      setValue("datosVehiculos", []);
    } else {
      setValue("datosVehiculos", vehiculosWithOperators);
      setIsOperatorsAssigned(true);
    }
  };

  const handleVehiculosListChange = (vehiculoList: VehiculoOption[]) => {
    setCurrentVehiculoList(vehiculoList);
  };

  const handleVehiculosListConfirm = (vehiculoList: VehiculoOption[]) => {
    setConfirmedVehiculoList(vehiculoList);
    setIsVehiculosConfirmed(vehiculoList.length > 0);
    if (vehiculoList.length > 0) {
      setValue("datosVehiculos", []);
      setIsOperatorsAssigned(false);
    }
  };

  const handleEditAssignments = () => {
    setIsOperatorsAssigned(false);
  };

  const getVehiculoInfo = (vehiculoId: string) => {
    return confirmedVehiculoList.find((v) => v.id === vehiculoId);
  };

  const getOperatorSummary = () => {
    if (!datosVehiculos || datosVehiculos.length === 0) return null;

    const withObservations = datosVehiculos.filter(
      (v) => v.isObservaciones
    ).length;

    return {
      totalAssigned: datosVehiculos.length,
      withObservations,
    };
  };

  const operatorSummary = getOperatorSummary();

  return (
    <Stack
      justifyContent="center"
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: `${displayColor}20`,
                  color: displayColor,
                }}
              >
                {displayIcon}
              </Box>
              <Typography variant="subtitle2" color="text.secondary">
                {displayLabel} Seleccionada
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {selectedEmpresa.empresa}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Chip
              label={displayLabel}
              size="small"
              variant="outlined"
              sx={{ bgcolor: `${displayColor}20`, color: displayColor }}
            />
          </Box>
          {selectedEmpresa.isUserCreated && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <HelperTextWarning
                isUserCreated={selectedEmpresa.isUserCreated}
                itemType="Empresa"
              />
            </Box>
          )}
        </CardContent>
      </Card>
      {selectedEmpresa.id !== "" && !isVehiculosConfirmed && (
        <VehiculoComponent
          empresaId={selectedEmpresa.id}
          onVehiculosListChange={handleVehiculosListChange}
          onVehiculosListConfirm={handleVehiculosListConfirm}
          requireConfirmation={true}
          initialVehiculoList={[]}
        />
      )}

      {/* Operator Assignment Component - Show if vehicles confirmed but operators not assigned */}
      {isVehiculosConfirmed &&
        confirmedVehiculoList.length > 0 &&
        !isOperatorsAssigned && (
          <OperatorAndObservationsSelection
            vehiculoList={confirmedVehiculoList}
            onPersonalAssignment={handlePersonalAssignment}
            title="Asignar Operadores y Observaciones"
            empresaId={selectedEmpresa.id}
          />
        )}

      {/* Completion Summary - Show when everything is assigned */}
      {isOperatorsAssigned && operatorSummary && (
        <Card
          elevation={2}
          sx={{
            borderRadius: 2,
            border: "2px solid",
            borderColor: "success.main",
            bgcolor: "success.50",
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <CheckCircleIcon sx={{ color: "success.main" }} />
              <Typography variant="h6" color="success.main" fontWeight="600">
                Asignaciones Completadas
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="body2">
                ✓ Todos los operadores han sido asignados exitosamente. Puedes
                continuar al siguiente paso.
              </Typography>
            </Alert>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Resumen de Asignaciones:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Chip
                  label={`${operatorSummary.totalAssigned} vehículo${
                    operatorSummary.totalAssigned > 1 ? "s" : ""
                  } asignado${operatorSummary.totalAssigned > 1 ? "s" : ""}`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
                {operatorSummary.withObservations > 0 && (
                  <Chip
                    label={`${operatorSummary.withObservations} con observaciones`}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                )}
              </Stack>
            </Box>

            {/* Show assigned vehicles summary */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                gutterBottom
              >
                Vehículos asignados:
              </Typography>
              <Stack spacing={0.5}>
                {datosVehiculos.map((assignment, index) => {
                  const vehiculoInfo = getVehiculoInfo(assignment.vehiculo);
                  return (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                    >
                      • {vehiculoInfo?.tipoVehiculo.label} -{" "}
                      {vehiculoInfo?.numInterno}
                      {assignment.isObservaciones && " (con observaciones)"}
                    </Typography>
                  );
                })}
              </Stack>
            </Box>

            {/* Edit button */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditAssignments}
                sx={{ minWidth: 150 }}
              >
                Editar Asignaciones
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
