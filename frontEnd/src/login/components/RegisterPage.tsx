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
} from "@mui/material";
import { useRegister } from "../services/register";
import {
  registerSchema,
  defaultValuesRegister,
  RegisterSchema,
  credentialsSchema,
  CredentialsSchema,
  defaultValuesCredentials,
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";
import { OficialSubmitPage } from "./OficialSubmitPage";

interface OficialData {
  dni: string;
  firstname: string;
  lastname: string;
  legajo: number;
}

interface RegisterPageProps {
  onRegisterBack: (data: boolean) => void;
}
export function RegisterPage({ onRegisterBack }: RegisterPageProps) {
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [oficialData, setOficialData] = useState<OficialData | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const methods = useForm<CredentialsSchema>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: defaultValuesCredentials,
    mode: "onChange",
  });

  const { handleSubmit, formState } = methods;

  console.log(formState.errors);

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
    }
  }, [isSuccess]);

  const handleOficialSubmit = (data: OficialData) => {
    setOficialData(data);
    setIsFirstStep(false);
  };

  const onSubmit = (data: CredentialsSchema) => {
    if (!oficialData) return;
    const completeData = {
      dni: oficialData.dni,
      password: data.password,
      email: data.email,
      firstname: oficialData.firstname,
      lastname: oficialData.lastname,
      legajo: oficialData.legajo,
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
            mt: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Complete su registro
          </Typography>
          {isError && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado"}
            </Alert>
          )}
          {showSuccessMessage && (
            <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
              Registro exitoso
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, width: "100%" }}
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Completar Registro"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}
