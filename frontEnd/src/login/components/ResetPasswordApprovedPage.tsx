import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { useResetPasswordService } from "../services/resetPassword";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
  defaultValuesResetPassword,
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";
import { AxiosError } from "axios";

interface ResetPasswordApprovedPageProps {
  requestId: string;
}

export function ResetPasswordApprovedPage({
  requestId,
}: ResetPasswordApprovedPageProps) {
  const methods = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { ...defaultValuesResetPassword, requestId },
    mode: "onChange",
  });

  const { handleSubmit } = methods;
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
    data: mutationData,
  } = useResetPasswordService();

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    methods.setValue("requestId", requestId);
    methods.trigger("requestId");
    if (isSuccess && mutationData) {
      const timeout = setTimeout(() => {
        setSuccessMessage(mutationData.message);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, mutationData, requestId, methods]);

  const onSubmit = (data: ResetPasswordSchema) => {
    resetPassword({
      requestId: requestId,
      password: data.password,
    });
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
            Coloque contraseña nueva
          </Typography>
          {isError && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {mutationError instanceof AxiosError
                ? mutationError.response?.data?.message
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
            <RHFTextField<ResetPasswordSchema>
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              autoFocus
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
                "Cambiar contraseña"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}
