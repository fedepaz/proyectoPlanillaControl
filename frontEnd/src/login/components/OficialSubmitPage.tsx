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
import { useOficialSubmit } from "../services/oficialSubmit";
import {
  oficialSchema,
  OficialSchema,
  defaultValuesOficial,
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";

interface SuccessData {
  dni: string;
  oficialId: string;
}

interface OficialSubmitPageProps {
  onSuccess: (data: SuccessData) => void;
  onRegisterBack: (data: boolean) => void;
}

export function OficialSubmitPage({
  onSuccess,
  onRegisterBack,
}: OficialSubmitPageProps) {
  const methods = useForm<OficialSchema>({
    resolver: zodResolver(oficialSchema),
    defaultValues: defaultValuesOficial,
    mode: "onChange",
  });

  const { handleSubmit } = methods;
  const [regreso, setRegreso] = useState(false);
  const {
    mutate: oficialSubmit,
    isPending,
    isSuccess,
    isError,
    error,
    data: mutationData,
  } = useOficialSubmit();

  useEffect(() => {
    if (isSuccess && mutationData) {
      onSuccess({
        dni: mutationData.dni,
        oficialId: mutationData.id,
      });
    }
  }, [isSuccess, mutationData, onSuccess]);

  const onSubmit = (formData: OficialSchema) => {
    oficialSubmit(formData);
  };
  const onRegreso = () => {
    setRegreso(true);
    onRegisterBack(regreso);
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
            Registro de Usuario
          </Typography>
          {isError && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado"}
            </Alert>
          )}
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
              autoComplete="firstname"
              autoFocus
            />
            <RHFTextField<OficialSchema>
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Apellido"
              name="lastname"
              autoComplete="lastname"
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
                "Registrar Usuario"
              )}
            </Button>
            <Button
              type="button"
              fullWidth
              color="secondary"
              variant="outlined"
              disabled={isPending}
              onClick={onRegreso}
            >
              {" "}
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Regresar"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}
