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
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useLogin } from "../services/login";
import {
  type LoginSchema,
  loginSchema,
  defaultValuesLogin,
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";
import { AxiosError } from "axios";

interface LoginResponse {
  authenticated: boolean;
  user: {
    dni: string;
    oficialId: {
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
    };
    role: string;
  };
}

interface LoginPageProps {
  onLogin: (data: LoginResponse) => void;
  onRegister: (data: boolean) => void;
  onResetPassword: (data: boolean) => void;
}

function LoginPage({ onLogin, onRegister, onResetPassword }: LoginPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValuesLogin,
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;
  const {
    mutate: login,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
    data: mutationData,
  } = useLogin();

  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (isError && mutationError instanceof AxiosError) {
      if (mutationError.response?.data?.name === "PasswordError") {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  }, [isError, mutationError]);

  useEffect(() => {
    if (isSuccess && mutationData) {
      const timeout = setTimeout(() => {
        onLogin(mutationData);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, mutationData, onLogin]);

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };
  const onRegisterButton = () => {
    onRegister(true);
  };

  const onResetPasswordButton = () => {
    onResetPassword(true);
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
              <LockOutlinedIcon
                sx={{
                  color: "white",
                }}
              />
            </Box>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
          </Box>

          {isError && passwordError ? (
            <Alert
              severity="warning"
              sx={{
                width: "100%",
                mt: 2,
                "& .MuiAlert-message": { width: "100%" },
              }}
            >
              {mutationError instanceof AxiosError
                ? mutationError.response?.data?.message
                : "Ocurrió un error inesperado"}
            </Alert>
          ) : isError ? (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                mt: 2,
                "& .MuiAlert-message": { width: "100%" },
              }}
            >
              {mutationError instanceof AxiosError
                ? mutationError.response?.data?.message
                : "Ocurrió un error inesperado"}
            </Alert>
          ) : null}
          {isSuccess && (
            <Alert
              severity="success"
              sx={{
                width: "100%",
                mt: 2,
                "& .MuiAlert-message": { width: "100%" },
              }}
            >
              {mutationData.message}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: "100%" }}
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
              sx={{ mt: 3, mb: 2, py: 1.5, position: "relative" }}
              disabled={isPending || !isValid}
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
                "Iniciar sesión"
              )}
            </Button>
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                o
              </Typography>
            </Divider>

            <Stack spacing={2} direction={isMobile ? "column" : "row"}>
              <Button
                type="button"
                fullWidth
                color="secondary"
                variant="outlined"
                disabled={isPending}
                onClick={onRegisterButton}
                startIcon={<PersonAddOutlinedIcon />}
                sx={{ py: 1 }}
              >
                {" "}
                {isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Registrar Usuario"
                )}
              </Button>

              <Button
                type="button"
                fullWidth
                color="secondary"
                variant="text"
                disabled={isPending}
                onClick={onResetPasswordButton}
                startIcon={<KeyOutlinedIcon />}
                sx={{ py: 1 }}
              >
                {" "}
                {isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Recuperar contraseña"
                )}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}

export default LoginPage;
