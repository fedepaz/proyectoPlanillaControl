import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Person,
  Flight,
  Schedule,
  DirectionsCar,
  Security,
  Luggage,
} from "@mui/icons-material";
import {
  ProcessedPlanillaData,
  formatDate,
  formatDateTime,
  formatTime,
} from "../../../types/searchTypes";

interface PlanillaCardProps {
  planilla: ProcessedPlanillaData;
  isMobile: boolean;
}

export function PlanillaCard({ planilla, isMobile }: PlanillaCardProps) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        mb: isMobile ? 2 : 3,
        borderRadius: isMobile ? 2 : 1,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 2,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardHeader
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Schedule color="primary" />
              <Typography
                variant={isMobile ? "h6" : "subtitle1"}
                component="div"
              >
                Planilla #{planilla.id?.slice(-6)}
              </Typography>
            </Box>
            <Chip
              label={formatDate(planilla.datosPsa.fecha)}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        }
        sx={{
          pb: 1,
          px: isMobile ? 2 : 3,
          pt: isMobile ? 2 : 3,
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          px: isMobile ? 2 : 3,
          pb: isMobile ? 2 : 3,
        }}
      >
        <Stack spacing={2}>
          {/* PSA Info */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Person fontSize="small" color="action" />
              <Typography variant="subtitle2" color="text.secondary">
                Datos PSA
              </Typography>
            </Box>
            <Box sx={{ pl: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Horario: {formatTime(planilla.datosPsa.horaIni)} -{" "}
                {formatTime(planilla.datosPsa.horaFin)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cantidad: {planilla.datosPsa.cant} personas
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Flight Info */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Flight fontSize="small" color="action" />
              <Typography variant="subtitle2" color="text.secondary">
                Datos de Vuelo
              </Typography>
            </Box>
            <Box sx={{ pl: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Posición: {planilla.datosVuelo.posicion}
              </Typography>
              {planilla.datosVuelo.horaPartida && (
                <Typography variant="body2" color="text.secondary">
                  Partida: {formatTime(planilla.datosVuelo.horaPartida)}
                </Typography>
              )}
              {planilla.datosVuelo.horaArribo && (
                <Typography variant="body2" color="text.secondary">
                  Arribo: {formatTime(planilla.datosVuelo.horaArribo)}
                </Typography>
              )}
            </Box>
          </Box>

          <Divider />

          {/* Counts Summary */}
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Resumen
            </Typography>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={1}
              sx={{ pl: 0 }}
            >
              <Chip
                icon={<Person fontSize="small" />}
                label={`${planilla.datosTerrestre?.length || 0} Personal`}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<Security fontSize="small" />}
                label={`${planilla.datosSeguridad?.length || 0} Seguridad`}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<DirectionsCar fontSize="small" />}
                label={`${planilla.datosVehiculos?.length || 0} Vehículos`}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>

          {/* Novedades */}
          {(planilla.novEquipajes ||
            planilla.novInspeccion ||
            planilla.novOtras) && (
            <>
              <Divider />
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Luggage fontSize="small" color="action" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Novedades
                  </Typography>
                </Box>
                <Box sx={{ pl: 3 }}>
                  {planilla.novEquipajes.isRequired && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      Equipajes: {planilla.novEquipajes.observaciones}
                    </Typography>
                  )}
                  {planilla.novInspeccion.isRequired && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      Inspección: {planilla.novInspeccion.observaciones}
                    </Typography>
                  )}
                  {planilla.novOtras.isRequired && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      Otras: {planilla.novOtras.observaciones}
                    </Typography>
                  )}
                </Box>
              </Box>
            </>
          )}

          {/* Metadata */}
          <Box
            sx={{
              pt: 1,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Creado: {formatDateTime(planilla.createdAt)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
