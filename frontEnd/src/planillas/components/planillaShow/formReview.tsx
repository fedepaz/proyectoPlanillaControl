"use client";
import { useState, useCallback } from "react";

import {
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  Grid,
  Alert,
  useTheme,
  useMediaQuery,
  Container,
  Avatar,
} from "@mui/material";
import {
  CheckCircle,
  ArrowBack,
  Person,
  Schedule,
  Flight,
  DirectionsCar,
  Security,
  Luggage,
} from "@mui/icons-material";
import type { PlanillaSchema } from "../../types/planillaSchema";
import { useAuth } from "../../../hooks/useAuth";
import { ResponsiveCard } from "../planillaComponents/components/responsiveCard";
import { FieldDisplay } from "../planillaComponents/components/fieldDisplay";
import { useCodVuelo } from "../../services/queries";
import { RHFDateTimePickerEnd } from "../../../components/RHFDateTimePickerEnd";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const codVueloCheckInfo = useCodVuelo();
  const codVueloCheck = codVueloCheckInfo.data?.filter(
    (item) => item.id === formData.datosVuelo.codVuelo
  );

  const codVueloData =
    codVueloCheck && codVueloCheck.length > 0 ? codVueloCheck[0] : null;

  // Get user information
  const { userInfo } = useAuth();

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

  const handleConfirm = useCallback(async () => {
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
  }, [horaFin, formData.datosPsa.horaIni, onConfirm]);

  // Updated handler for DateTimePicker
  const handleHoraFinChange = useCallback((value: string) => {
    setHoraFin(value);
    setError(null); // Clear error when value changes
  }, []);

  const formatTime = (time: string) => {
    if (!time || time.length !== 4) return time;
    return `${time.slice(0, 2)}:${time.slice(2)}`;
  };

  const formatDate = (date: string) => {
    return date;
  };
  const getUserDisplayName = () => {
    if (!userInfo?.user) return "Usuario no identificado";

    const firstName = userInfo.user.oficialId?.firstname;
    const lastName = userInfo.user.oficialId?.lastname;

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
  };

  const getUserInitials = () => {
    if (!userInfo?.user) return "U";

    const firstName = userInfo.user.oficialId?.firstname;
    const lastName = userInfo.user.oficialId?.lastname;

    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
  };

  return (
    <Container
      maxWidth={isMobile ? "sm" : isTablet ? "md" : "lg"}
      sx={{
        px: isMobile ? 1 : 2,
        pb: isMobile ? 2 : 3,
      }}
    >
      <Paper
        elevation={isMobile ? 1 : 2}
        sx={{
          p: isMobile ? 2 : 3,
          borderRadius: isMobile ? 2 : 1,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexDirection: isMobile ? "column" : "row",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <CheckCircle color="primary" />
            Revisión Final del Formulario
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            Revise todos los datos ingresados antes de finalizar el proceso
          </Typography>
        </Box>

        <Stack spacing={isMobile ? 2 : 3}>
          {/* User Information */}
          <ResponsiveCard
            title="Responsable"
            icon={<Person color="primary" />}
            isMobile={isMobile}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexDirection: isMobile ? "column" : "row",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: isMobile ? 48 : 40,
                  height: isMobile ? 48 : 40,
                }}
              >
                {getUserInitials()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {userInfo?.user?.oficialId?.jerarquiaId?.jerarquia.toUpperCase()}{" "}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {getUserDisplayName()}
                </Typography>

                {userInfo?.user?.oficialId?.currentAirportId?.aeropuerto && (
                  <Typography variant="body2" color="text.secondary">
                    {userInfo.user.oficialId.currentAirportId.aeropuerto}
                  </Typography>
                )}
              </Box>
            </Box>
          </ResponsiveCard>

          {/* Datos PSA */}
          <ResponsiveCard
            title="Datos PSA"
            icon={<Schedule color="primary" />}
            isMobile={isMobile}
          >
            <Grid container spacing={isMobile ? 2 : 2}>
              <FieldDisplay
                label="Fecha"
                value={formatDate(formData.datosPsa.fecha)}
                isMobile={isMobile}
              />
              <FieldDisplay
                label="Cantidad"
                value={formData.datosPsa.cant}
                isMobile={isMobile}
              />
              <FieldDisplay
                label="Hora Inicio"
                value={formatTime(formData.datosPsa.horaIni)}
                isMobile={isMobile}
              />
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 500, mb: 1 }}
                  >
                    Hora Fin: *
                  </Typography>
                  <RHFDateTimePickerEnd
                    value={horaFin}
                    onChange={handleHoraFinChange}
                    label="Hora Fin"
                    isEndTime={true}
                    startTimeValue={formData.datosPsa.horaIni}
                    disabled={isSubmitting}
                  />
                </Box>
              </Grid>
            </Grid>
          </ResponsiveCard>

          {/* Datos Vuelo */}
          <ResponsiveCard
            title="Datos de Vuelo"
            icon={<Flight color="primary" />}
            isMobile={isMobile}
          >
            <Grid container spacing={isMobile ? 2 : 2}>
              {codVueloData && codVueloData.empresa && (
                <FieldDisplay
                  label="Empresa"
                  value={codVueloData.empresa.empresa}
                  isMobile={isMobile}
                />
              )}
              {codVueloData && (
                <FieldDisplay
                  label="Código de vuelo"
                  value={codVueloData.codVuelo}
                  isMobile={isMobile}
                />
              )}
              {codVueloData && codVueloData.origen && (
                <FieldDisplay
                  label="Origen"
                  value={codVueloData.origen.codIATA}
                  isMobile={isMobile}
                />
              )}
              {codVueloData && codVueloData.destino && (
                <FieldDisplay
                  label="Destino"
                  value={codVueloData.destino.codIATA}
                  isMobile={isMobile}
                />
              )}
              <FieldDisplay
                label="Posición"
                value={formData.datosVuelo.posicion}
                isMobile={isMobile}
              />
              {formData.datosVuelo.horaPartida && (
                <FieldDisplay
                  label="Hora Partida"
                  value={formatTime(formData.datosVuelo.horaPartida)}
                  isMobile={isMobile}
                />
              )}
              {formData.datosVuelo.horaArribo && (
                <FieldDisplay
                  label="Hora Arribo"
                  value={formatTime(formData.datosVuelo.horaArribo)}
                  isMobile={isMobile}
                />
              )}
            </Grid>
          </ResponsiveCard>

          {/* Datos Terrestre */}
          {formData.datosTerrestre && formData.datosTerrestre.length > 0 && (
            <ResponsiveCard
              title="Personal Terrestre"
              icon={<Person color="primary" />}
              isMobile={isMobile}
            >
              <Typography variant="body2" color="text.secondary">
                {formData.datosTerrestre.length} registro(s) de personal
                terrestre configurado(s)
              </Typography>
            </ResponsiveCard>
          )}

          {/* Datos Seguridad */}
          {formData.datosSeguridad && formData.datosSeguridad.length > 0 && (
            <ResponsiveCard
              title="Datos de Seguridad"
              icon={<Security color="primary" />}
              isMobile={isMobile}
            >
              <Typography variant="body2" color="text.secondary">
                {formData.datosSeguridad.length} registro(s) de seguridad
                configurado(s)
              </Typography>
            </ResponsiveCard>
          )}

          {/* Datos Vehículos */}
          {formData.datosVehiculos && formData.datosVehiculos.length > 0 && (
            <ResponsiveCard
              title="Vehículos"
              icon={<DirectionsCar color="primary" />}
              isMobile={isMobile}
            >
              <Typography variant="body2" color="text.secondary">
                {formData.datosVehiculos.length} registro(s) de vehiculos
                configurado(s)
              </Typography>
            </ResponsiveCard>
          )}

          {/* Novedades */}
          <ResponsiveCard
            title="Novedades"
            icon={<Luggage color="primary" />}
            isMobile={isMobile}
          >
            <Grid container spacing={isMobile ? 2 : 2}>
              <FieldDisplay
                label="Equipajes"
                value={
                  <Box>
                    <Typography component="span">
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
                  </Box>
                }
                isMobile={isMobile}
              />
              <FieldDisplay
                label="Inspección"
                value={
                  <Box>
                    <Typography component="span">
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
                  </Box>
                }
                isMobile={isMobile}
              />
              <FieldDisplay
                label="Otras"
                value={
                  <Box>
                    <Typography component="span">
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
                  </Box>
                }
                fullWidth
                isMobile={isMobile}
              />
            </Grid>
          </ResponsiveCard>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ borderRadius: isMobile ? 2 : 1 }}>
              {error}
            </Alert>
          )}

          {/* Action Buttons */}
          <Paper
            elevation={1}
            sx={{
              p: isMobile ? 2 : 2,
              borderRadius: isMobile ? 2 : 1,
              position: isMobile ? "sticky" : "static",
              bottom: isMobile ? 0 : "auto",
              zIndex: isMobile ? 1000 : "auto",
              boxShadow: isMobile ? theme.shadows[8] : theme.shadows[1],
            }}
          >
            <Stack
              direction={isMobile ? "column" : "row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "stretch",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={onBack}
                disabled={isSubmitting}
                size={isMobile ? "large" : "medium"}
                sx={{
                  minWidth: isMobile ? "100%" : "140px",
                  order: isMobile ? 2 : 1,
                  mt: isMobile ? 2 : 0,
                  mb: isMobile ? 2 : 0,
                }}
              >
                Volver a Editar
              </Button>
              <Button
                variant="contained"
                startIcon={<CheckCircle />}
                onClick={handleConfirm}
                disabled={isSubmitting || !horaFin.trim()}
                size={isMobile ? "large" : "medium"}
                sx={{
                  minWidth: isMobile ? "100%" : "140px",
                  order: isMobile ? 1 : 2,
                  mt: isMobile ? 2 : 0,
                  mb: isMobile ? 2 : 0,
                }}
              >
                {isSubmitting ? "Enviando..." : "Confirmar y Enviar"}
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}
