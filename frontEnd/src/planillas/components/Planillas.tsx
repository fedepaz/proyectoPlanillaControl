import {
  Button,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
  Box,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
//import { useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../types/planillaSchema";
import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { RHFTextField } from "../../components/RHFTextField";
import { FormStepper } from "./planillaComponents/components/formStepperComponent";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";
import { DatosSeguridad } from "./planillaComponents/datosSeguridad";
import { DatosVehiculos } from "./planillaComponents/datosVehiculos";
import { DatosPsa } from "./planillaComponents/datosPsa";

interface PlanillaProps {
  onBack: (data: boolean) => void;
  activeStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function Planillas({
  onBack,
  activeStep,
  onNext,
  onPrevious,
}: PlanillaProps) {
  //const { setValue } = useFormContext<PlanillaSchema>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sendBack = () => {
    onBack(false);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <DatosVuelo />;
      case 1: //Terrestres
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <Box
              sx={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DatosTerrestre />
            </Box>
          </Paper>
        );
      case 2:
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <Box
              sx={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DatosSeguridad />
            </Box>
          </Paper>
        );
      case 3: // vehiculos
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <Box
              sx={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DatosVehiculos />
            </Box>
          </Paper>
        );
      case 4:
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <Box
              sx={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RHFTextField<PlanillaSchema>
                name="novEquipajes"
                label="Novedades Equipajes"
              />
              {/*novInspeccion: string;*/}
              <RHFTextField<PlanillaSchema>
                name="novInspeccion"
                label="Novedades Inspección"
              />
              {/*novOtras: string;*/}
              <RHFTextField<PlanillaSchema>
                name="novOtras"
                label="Otras Novedades"
              />

              <DatosPsa />
            </Box>
          </Paper>
        );
      default:
        return null;
    }
  };

  const isLastStep = activeStep === 4;

  return (
    <Container
      maxWidth={isMobile ? "sm" : "md"}
      sx={{
        pb: isMobile ? 4 : 2,
        overflowY: "auto",
      }}
    >
      <FormStepper activeStep={activeStep} />
      <Stack
        sx={{
          gap: 3,
          minHeight: "calc(100vh - 200px)",
          justifyContent: "space-between",
        }}
      >
        {renderStepContent()}

        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "space-between",
            }}
          >
            {activeStep === 0 ? (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={sendBack}
                sx={{ minWidth: "120px" }}
              >
                Regresar
              </Button>
            ) : (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={onPrevious}
                sx={{ minWidth: "120px" }}
              >
                Anterior
              </Button>
            )}
            {isLastStep ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                sx={{ minWidth: "120px" }}
              >
                Finalizar
              </Button>
            ) : (
              <Button
                type="button"
                variant="contained"
                color="primary"
                startIcon={<ArrowForwardIcon />}
                onClick={onNext}
                sx={{ minWidth: "120px" }}
              >
                Siguiente
              </Button>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
