import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

import { useRequestResetPasswordService } from "../services/resetPassword";
import {
  ResetPasswordRequestSchema,
  resetPasswordRequestSchema,
  defaultValuesResetPasswordRequest,
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";
import { AxiosError } from "axios";
import { ResetPasswordApprovedPage } from "./ResetPasswordApprovedPage";
import { ResetPasswordWelcomeModal } from "./helpComponents/ResetPasswordWelcomeModal";

interface ResetPasswordProps {
  onResetPassword: (data: boolean) => void;
}

function ResetPasswordPage({ onResetPassword }: ResetPasswordProps) {
  const methods = useForm<ResetPasswordRequestSchema>({
    resolver: zodResolver(resetPasswordRequestSchema),
    defaultValues: defaultValuesResetPasswordRequest,
    mode: "onChange",
  });

  const { handleSubmit } = methods;
  const {
    mutate: requestResetPassword,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
    data: mutationData,
  } = useRequestResetPasswordService();
  const [successMessage, setSuccessMessage] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (isSuccess && mutationData) {
      setSuccessMessage(mutationData.message);
      setRequestId(mutationData.id);
      const timeout = setTimeout(() => {
        setIsApproved(mutationData.okToChangePassword);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, mutationData, onResetPassword]);

  const onSubmit = (data: ResetPasswordRequestSchema) => {
    requestResetPassword(data);
  };
  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  return showWelcome ? (
    <ResetPasswordWelcomeModal
      open={showWelcome}
      onGetStarted={handleGetStarted}
    />
  ) : isApproved ? (
    <ResetPasswordApprovedPage requestId={requestId} />
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
            Solicitud de cambio de contraseña
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
            <RHFTextField<ResetPasswordRequestSchema>
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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
                "Enviar solicitud"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}

export default ResetPasswordPage;
