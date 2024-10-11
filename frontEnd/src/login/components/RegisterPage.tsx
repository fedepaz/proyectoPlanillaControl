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
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";
import { OficialSubmitPage } from "./OficialSubmitPage";

interface SuccessData {
  dni: string;
  oficialId: string;
}

interface RegisterPageProps {
  onRegisterBack: (data: boolean) => void;
}
export function RegisterPage({ onRegisterBack }: RegisterPageProps) {
  const [isNewOficial, setIsNewOficial] = useState(true);
  const [oficialData, setOficialData] = useState<SuccessData | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValuesRegister,
    mode: "onChange",
  });

  const { handleSubmit, setValue } = methods;
  const [regreso, setRegreso] = useState(false);
  const {
    mutate: register,
    isPending,
    isSuccess,
    isError,
    error,
  } = useRegister();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
    }
  }, [isSuccess]);

  const handleOficialSubmit = (data: SuccessData) => {
    setOficialData(data);
    setIsNewOficial(false);

    setValue("dni", data.dni);
    setValue("oficialId", data.oficialId);
  };

  const onSubmit = (data: RegisterSchema) => {
    const completeData = {
      ...data,
      dni: oficialData?.dni || "",
      oficialId: oficialData?.oficialId || "",
    };
    register(completeData);
  };
  const onRegreso = () => {
    setRegreso(true);
    onRegisterBack(regreso);
  };

  return isNewOficial ? (
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
            <RHFTextField<RegisterSchema>
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <RHFTextField<RegisterSchema>
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
              disabled={isPending}
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
