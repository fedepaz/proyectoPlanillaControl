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
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusinessIcon from "@mui/icons-material/Business";
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
  observacionesVehiculo?: string;
}

export function DatosVehiculos() {
  const { watch, setValue } = useFormContext<PlanillaSchema>();
  const datosTerrestre = watch("datosTerrestre.0") as PersonalWithFunction;
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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { data } = usePersonalHandlingEmpresa(datosTerrestre?.personalEmpresa);

  useEffect(() => {
    if (!data) {
      setSelectedEmpresa(null);
    } else {
      setSelectedEmpresa(data.empresa);
    }
  }, [data]);

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
      setIsConfirmed(false);
      setValue("datosVehiculos", []);
    } else {
      setValue("datosVehiculos", vehiculosWithOperators);
    }
  };

  const handleVehiculosListChange = (vehiculoList: VehiculoOption[]) => {
    setCurrentVehiculoList(vehiculoList);
  };

  const handleVehiculosListConfirm = (vehiculoList: VehiculoOption[]) => {
    setConfirmedVehiculoList(vehiculoList);
    setIsConfirmed(vehiculoList.length > 0);
    if (vehiculoList.length > 0) {
      setValue("datosVehiculos", []);
    }
  };

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
      {selectedEmpresa.id !== "" && !isConfirmed && (
        <VehiculoComponent
          empresaId={selectedEmpresa.id}
          onVehiculosListChange={handleVehiculosListChange}
          onVehiculosListConfirm={handleVehiculosListConfirm}
          requireConfirmation={true}
          initialVehiculoList={[]}
        />
      )}
      {isConfirmed && confirmedVehiculoList.length > 0 && (
        <OperatorAndObservationsSelection
          vehiculoList={confirmedVehiculoList}
          onPersonalAssignment={handlePersonalAssignment}
          title="Operadores y Observaciones Confirmados"
          empresaId={selectedEmpresa.id}
        />
      )}
      {/*         
        <RHFTextField<PlanillaSchema>
          name="datosVehiculos.0.operadorVehiculo"
          label="Operador"
        />
        <RHFTextField<PlanillaSchema>
          name="datosVehiculos.0.observacionesVehiculo"
          label="Observaciones"
          />
          */}
    </Stack>
  );
}
