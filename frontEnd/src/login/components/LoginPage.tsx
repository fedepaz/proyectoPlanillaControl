import React, { useEffect, useState } from "react";
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
import { useLogin } from "../services/login";
import {
  LoginSchema,
  loginSchema,
  defaultValuesLogin,
} from "../types/loginSchema";
import { RHFTextField } from "../../components/RHFTextField";

export function LoginPage() {
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValuesLogin,
    mode: "onChange",
  });

  const { handleSubmit } = methods;
  const { mutate: login, isPending, isSuccess, isError, error } = useLogin();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage("Inicio de sesión exitoso");
    }
  }, [isSuccess]);

  const onSubmit = (data: LoginSchema) => {
    login(data);
    console.log("Login attempt with:", data);
  };

  return (
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
            Iniciar sesión
          </Typography>
          {isError && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado"}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <RHFTextField<LoginSchema>
              margin="normal"
              required
              fullWidth
              id="dni"
              label="DNI"
              name="dni"
              autoComplete="dni"
              autoFocus
            />
            <RHFTextField<LoginSchema>
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
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
                "Iniciar sesión"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}
