import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import {
  oficialSchema,
  OficialSchema,
  defaultValuesOficial,
} from "../types/modelsSchema";
import { RHFTextField } from "../../components/RHFTextField";

interface SuccessData {
  dni: string;
  firstname: string;
  lastname: string;
  legajo: number;
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

  const onSubmit = (formData: OficialSchema) => {
    onSuccess({
      dni: formData.dni,
      firstname: formData.firstname,
      lastname: formData.lastname,
      legajo: parseInt(formData.legajo, 10),
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
            mt: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Registro de Oficial
          </Typography>

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
            >
              Registrar Usuario
            </Button>
            <Button
              type="button"
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={onRegreso}
            >
              Regresar
            </Button>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  );
}
