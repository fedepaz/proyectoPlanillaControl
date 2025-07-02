"use client";

import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  Divider,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Alert,
} from "@mui/material";
import { CheckCircle, ArrowBack } from "@mui/icons-material";
import type { PlanillaSchema } from "../../types/planillaSchema";

interface FormReviewProps {
  formData: PlanillaSchema;
  onConfirm: (finalHoraFin: string) => Promise<void>;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function FormReview({
  formData,
  onConfirm,
  onBack,
  isSubmitting = false,
}: FormReviewProps) {
  const [horaFin, setHoraFin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateTimeFormat = (time: string) => {
    const timeRegex = /^([01]?[0-9]|2[0-3])[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const validateEndTime = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return false;

    const start = Number.parseInt(startTime);
    const end = Number.parseInt(endTime);

    return end >= start;
  };

  const handleConfirm = async () => {
    setError(null);

    if (!horaFin.trim()) {
      setError("La hora de fin es requerida");
      return;
    }

    if (!validateTimeFormat(horaFin)) {
      setError("La hora debe estar en formato 24-horas (HHMM)");
      return;
    }

    if (!validateEndTime(formData.datosPsa.horaIni, horaFin)) {
      setError("La hora de fin debe ser mayor o igual a la hora de inicio");
      return;
    }

    await onConfirm(horaFin);
  };

  const formatTime = (time: string) => {
    if (!time || time.length !== 4) return time;
    return `${time.slice(0, 2)}:${time.slice(2)}`;
  };

  const formatDate = (date: string) => {
    // Assuming date is in DD/MM/YYYY format
    return date;
  };

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <CheckCircle color="primary" />
          Revisión Final del Formulario
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Revise todos los datos ingresados antes de finalizar el proceso
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Datos PSA */}
        <Card variant="outlined">
          <CardHeader title="Datos PSA" sx={{ pb: 1 }} />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Fecha:
                </Typography>
                <Typography variant="body1">
                  {formatDate(formData.datosPsa.fecha)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Cantidad:
                </Typography>
                <Typography variant="body1">
                  {formData.datosPsa.cant}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Hora Inicio:
                </Typography>
                <Typography variant="body1">
                  {formatTime(formData.datosPsa.horaIni)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Hora Fin: *
                  </Typography>
                  <TextField
                    size="small"
                    placeholder="HHMM"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    error={!!error}
                    helperText={error || "Formato: HHMM (ej: 1430)"}
                    inputProps={{ maxLength: 4 }}
                    disabled={isSubmitting}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Datos Vuelo */}
        <Card variant="outlined">
          <CardHeader title="Datos de Vuelo" sx={{ pb: 1 }} />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Posición:
                </Typography>
                <Typography variant="body1">
                  {formData.datosVuelo.posicion}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Hora Partida:
                </Typography>
                <Typography variant="body1">
                  {formatTime(formData.datosVuelo.horaPartida)}
                </Typography>
              </Grid>
              {formData.datosVuelo.horaArribo && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Hora Arribo:
                  </Typography>
                  <Typography variant="body1">
                    {formatTime(formData.datosVuelo.horaArribo)}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>

        {/* Datos Terrestre */}
        {formData.datosTerrestre && formData.datosTerrestre.length > 0 && (
          <Card variant="outlined">
            <CardHeader
              title={`Personal Terrestre (${formData.datosTerrestre.length})`}
              sx={{ pb: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
              {formData.datosTerrestre.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: index < formData.datosTerrestre.length - 1 ? 2 : 0,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Personal {index + 1} - Grupo: {item.grupo}
                  </Typography>
                  {index < formData.datosTerrestre.length - 1 && (
                    <Divider sx={{ mt: 1 }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Datos Seguridad */}
        {formData.datosSeguridad && formData.datosSeguridad.length > 0 && (
          <Card variant="outlined">
            <CardHeader
              title={`Datos de Seguridad (${formData.datosSeguridad.length})`}
              sx={{ pb: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body2" color="text.secondary">
                {formData.datosSeguridad.length} registro(s) de seguridad
                configurado(s)
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Datos Vehículos */}
        {formData.datosVehiculos && formData.datosVehiculos.length > 0 && (
          <Card variant="outlined">
            <CardHeader
              title={`Vehículos (${formData.datosVehiculos.length})`}
              sx={{ pb: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
              {formData.datosVehiculos.map((vehiculo, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: index < formData.datosVehiculos.length - 1 ? 2 : 0,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Vehículo {index + 1}
                    {vehiculo.isObservaciones &&
                      vehiculo.observacionesVehiculo && (
                        <Typography
                          variant="body2"
                          sx={{ mt: 0.5, fontStyle: "italic" }}
                        >
                          Obs: {vehiculo.observacionesVehiculo}
                        </Typography>
                      )}
                  </Typography>
                  {index < formData.datosVehiculos.length - 1 && (
                    <Divider sx={{ mt: 1 }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Novedades */}
        <Card variant="outlined">
          <CardHeader title="Novedades" sx={{ pb: 1 }} />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Equipajes:
                </Typography>
                <Typography variant="body1">
                  {formData.novEquipajes?.isRequired ? "Sí" : "No"}
                </Typography>
                {formData.novEquipajes?.isRequired &&
                  formData.novEquipajes.observaciones && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, fontStyle: "italic" }}
                    >
                      {formData.novEquipajes.observaciones}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Inspección:
                </Typography>
                <Typography variant="body1">
                  {formData.novInspeccion?.isRequired ? "Sí" : "No"}
                </Typography>
                {formData.novInspeccion?.isRequired &&
                  formData.novInspeccion.observaciones && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, fontStyle: "italic" }}
                    >
                      {formData.novInspeccion.observaciones}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Otras:
                </Typography>
                <Typography variant="body1">
                  {formData.novOtras?.isRequired ? "Sí" : "No"}
                </Typography>
                {formData.novOtras?.isRequired &&
                  formData.novOtras.observaciones && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, fontStyle: "italic" }}
                    >
                      {formData.novOtras.observaciones}
                    </Typography>
                  )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Action Buttons */}
        <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={onBack}
              disabled={isSubmitting}
            >
              Volver a Editar
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircle />}
              onClick={handleConfirm}
              disabled={isSubmitting || !horaFin.trim()}
              sx={{ minWidth: 140 }}
            >
              {isSubmitting ? "Enviando..." : "Confirmar y Enviar"}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Paper>
  );
}
