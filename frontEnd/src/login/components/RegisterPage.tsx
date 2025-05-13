import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRegister } from "../services/register";
import {
  credentialsSchema,
  type CredentialsSchema,
  defaultValuesCredentials,
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";
import { OficialSubmitPage } from "./OficialSubmitPage";

interface OficialData {
  dni: string;
  firstname: string;
  lastname: string;
  legajo: number;
  unidadId: string;
  jerarquiaId: string;
}

interface RegisterPageProps {
  onRegisterBack: (data: boolean) => void;
}
export function RegisterPage({ onRegisterBack }: RegisterPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isFirstStep, setIsFirstStep] = useState(true);
  const [oficialData, setOficialData] = useState<OficialData | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const methods = useForm<CredentialsSchema>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: defaultValuesCredentials,
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const {
    mutate: register,
    isSuccess,
    isError,
    error,
    isPending,
  } = useRegister();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      const timeout = setTimeout(() => {
        onRegisterBack(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, onRegisterBack]);

  const handleOficialSubmit = (data: OficialData) => {
    setOficialData(data);
    console.log(data);
    setIsFirstStep(false);
    console.log(oficialData);
  };

  const onSubmit = (data: CredentialsSchema) => {
    console.log(oficialData);
    if (!oficialData) return;
    const completeData = {
      dni: oficialData.dni,
      password: data.password,
      email: data.email,
      firstname: oficialData.firstname,
      lastname: oficialData.lastname,
      legajo: oficialData.legajo,
      currentAirportId: oficialData.unidadId,
      jerarquiaId: oficialData.jerarquiaId,
    };
    register(completeData);
  };
  const onRegreso = () => {
    onRegisterBack(true);
  };

  return isFirstStep ? (
    <OficialSubmitPage
      onSuccess={handleOficialSubmit}
      onRegisterBack={onRegreso}
    />
  ) : (
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
              <PersonAddOutlinedIcon sx={{ color: "white" }} />
            </Box>
            <Typography component="h1" variant="h5" fontWeight={500}>
              Complete su registro
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, textAlign: "center" }}
            >
              Paso 2 de 2: Cree sus credenciales de acceso
            </Typography>
          </Box>

          {isError && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                mt: 2,
                "& .MuiAlert-message": { width: "100%" },
              }}
            >
              {error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado"}
            </Alert>
          )}
          {showSuccessMessage && (
            <Alert
              severity="success"
              sx={{
                width: "100%",
                mt: 2,
                "& .MuiAlert-message": { width: "100%" },
              }}
            >
              <Typography variant="subtitle2"> !Registro exitoso! </Typography>
              <Typography variant="body2">
                Ahora puedes ingresar a su cuenta
              </Typography>
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: "100%" }}
          >
            <RHFTextField<CredentialsSchema>
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              disabled={showSuccessMessage}
            />
            <RHFTextField<CredentialsSchema>
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              disabled={showSuccessMessage}
              helperText="La contraseña debe tener al menos 8 caracteres"
            />
            <Divider sx={{ my: 3 }} />

            {showSuccessMessage ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onRegreso}
                startIcon={<ArrowBackIcon />}
                sx={{ py: 1.5 }}
              >
                Volver
              </Button>
            ) : (
              <Stack spacing={2} direction={isMobile ? "column" : "row"}>
                <Button
                  type="button"
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={onRegreso}
                  startIcon={<ArrowBackIcon />}
                  disabled={isPending}
                  sx={{ py: 1.5 }}
                >
                  Regresar
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isPending || !isValid}
                  sx={{ py: 1.5, position: "relative" }}
                >
                  {isPending ? (
                    <CircularProgress
                      size={24}
                      color="inherit"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  ) : (
                    "Completar Registro"
                  )}
                </Button>
              </Stack>
            )}
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}
