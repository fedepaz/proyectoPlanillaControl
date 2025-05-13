import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  type OficialSchema,
  oficialSchema,
  defaultValuesOficial,
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";
import { RHFDropDownJerarquia } from "../../components/RHFDropDownJerarquia";
import { useJerarquia, useUnidad } from "../../planillas/services/queries";
import { JerarquiaOption, UnidadOption } from "../../types/option";
import { RHFDropDownCurrentAirport } from "../../components/RHFDropDownCurrentAirport";

interface SuccessData {
  dni: string;
  firstname: string;
  lastname: string;
  legajo: number;
  unidadId: string;
  jerarquiaId: string;
}

interface OficialSubmitPageProps {
  onSuccess: (data: SuccessData) => void;
  onRegisterBack: (data: boolean) => void;
}

export function OficialSubmitPage({
  onSuccess,
  onRegisterBack,
}: OficialSubmitPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const methods = useForm<OficialSchema>({
    resolver: zodResolver(oficialSchema),
    defaultValues: defaultValuesOficial,
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const jerarquiasQuery = useJerarquia();
  const jerarquiasOptions: JerarquiaOption[] =
    jerarquiasQuery.data?.map((item) => ({
      id: item.id,
      label: item.label,
    })) || [];

  const unidadesQuery = useUnidad();
  const unidadesOptions: UnidadOption[] =
    unidadesQuery.data?.map((item) => ({
      id: item.id,
      aeropuerto: item.aeropuerto,
      codIATA: item.codIATA,
      codOAĆI: item.codOAĆI,
    })) || [];

  const onSubmit = (formData: OficialSchema) => {
    onSuccess({
      dni: formData.dni,
      firstname: formData.firstname,
      lastname: formData.lastname,
      legajo: parseInt(formData.legajo, 10),
      unidadId: formData.unidadId,
      jerarquiaId: formData.jerarquiaId,
    });
  };
  const onRegreso = () => {
    onRegisterBack(true);
  };

  return (
    <FormProvider {...methods}>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            mt: { xs: 4, sm: 8 },
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <BadgeOutlinedIcon sx={{ color: "white" }} />
            </Box>
            <Typography component="h1" variant="h5" fontWeight={500}>
              Registro de Oficial
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, textAlign: "center" }}
            >
              Paso 1 de 2: Ingrese sus datos personales
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <RHFTextField<OficialSchema>
              margin="normal"
              required
              fullWidth
              id="dni"
              label="DNI"
              name="dni"
              autoComplete="dni"
              autoFocus
            />
            <RHFTextField<OficialSchema>
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="Nombre"
              name="firstname"
              autoComplete="given-name"
              autoFocus
            />
            <RHFTextField<OficialSchema>
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Apellido"
              name="lastname"
              autoComplete="family-name"
              autoFocus
            />
            <RHFTextField<OficialSchema>
              margin="normal"
              required
              fullWidth
              id="legajo"
              label="Legajo"
              name="legajo"
              autoComplete="legajo"
              autoFocus
            />
            <RHFDropDownJerarquia<OficialSchema>
              margin="normal"
              fullWidth
              name="jerarquiaId"
              options={jerarquiasOptions}
              label="Jerarquia"
            />

            <RHFDropDownCurrentAirport<OficialSchema>
              margin="normal"
              fullWidth
              name="unidadId"
              options={unidadesOptions}
              label="Unidad"
            />
            <Divider sx={{ my: 3 }} />

            <Stack spacing={2} direction={isMobile ? "column" : "row"}>
              <Button
                type="button"
                fullWidth
                color="secondary"
                variant="outlined"
                onClick={onRegreso}
                startIcon={<ArrowBackIcon />}
                sx={{ py: 1.5 }}
              >
                Regresar
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isValid}
                startIcon={<ArrowForwardIcon />}
                sx={{ py: 1.5 }}
              >
                Continuar
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}
