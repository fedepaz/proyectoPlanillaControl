import React, { useEffect, useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Person from "@mui/icons-material/Person";
import Flight from "@mui/icons-material/Flight";
import Assignment from "@mui/icons-material/Assignment";
import Security from "@mui/icons-material/Security";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import Group from "@mui/icons-material/Group";
import Info from "@mui/icons-material/InfoOutlined";
import Warning from "@mui/icons-material/Warning";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Close from "@mui/icons-material/Close";
import Home from "@mui/icons-material/Home";

import ErrorPage from "../../../../components/Error";
import Loading from "../../../../components/Loading";
import { usePlanillaID } from "../../../services/planillas";
import { formatDate, formatTime } from "../../../types/searchTypes";

import PlanillaPDFGenerator from "../../planillaPrint/PlanillaPDFGenerator";
import { useAuth } from "../../../../hooks/useAuth";
import SuccessHelpModal from "../../planillaHelp/SuccessHelpModal";

interface PlanillaDetailByIdProps {
  open: boolean;
  planillaId: string;
  onClose: () => void;
  isSuccessView?: boolean;
}

export const PlanillaDetailById: React.FC<PlanillaDetailByIdProps> = ({
  open,
  planillaId,
  onClose,
  isSuccessView = false,
}) => {
  const { data, isLoading, isError, error } = usePlanillaID(planillaId);
  const { userInfo } = useAuth();
  const [showSuccessHelp, setShowSuccessHelp] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Don't fetch data if modal is not open
  const shouldFetch = open && planillaId;

  useEffect(() => {
    if (!isSuccessView || !open) return;
    if (isLoading) return;
    if (isError) return;
    const viewedKey = `successHelpViewed_${userInfo?.user?.dni || "guest"}`;
    if (!localStorage.getItem(viewedKey)) {
      setShowSuccessHelp(true);
    }
  }, [isSuccessView, open, isLoading, isError, userInfo]);

  if (!shouldFetch) {
    return null;
  }

  const handleSuccessHelpClose = () => {
    setShowSuccessHelp(false);

    // Marcar como visto en localStorage
    const viewedKey = `successHelpViewed_${userInfo?.user?.dni || "guest"}`;
    localStorage.setItem(viewedKey, "true");
  };

  const renderContent = () => {
    if (isLoading) return <Loading />;

    if (isError) return <ErrorPage error={error} />;

    if (!data) {
      const error = new Error();
      error.name = "PlanillaNotFound";
      error.message = "Planilla not found";
      return <ErrorPage error={error} />;
    }

    const InfoCard: React.FC<{
      title: string;
      icon: React.ReactNode;
      children: React.ReactNode;
      color?: "primary" | "secondary" | "success" | "warning" | "error";
    }> = ({ title, icon, children, color = "primary" }) => (
      <Card
        elevation={isMobile ? 2 : 3}
        sx={{
          mb: 3,
          borderRadius: 2,
          borderLeft: `4px solid ${theme.palette[color].main}`,
        }}
      >
        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: `${color}.main`,
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
              }}
            >
              {icon}
            </Avatar>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              color={`${color}.main`}
            >
              {title}
            </Typography>
          </Stack>
          {children}
        </CardContent>
      </Card>
    );

    const DataRow: React.FC<{
      label: string;
      value: string | number | React.ReactNode;
      fullWidth?: boolean;
    }> = ({ label, value, fullWidth = false }) => (
      <Grid container spacing={2} sx={{ mb: 1.5 }}>
        <Grid item xs={fullWidth ? 12 : isMobile ? 5 : 4}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="medium"
            sx={{ fontSize: isMobile ? "0.85rem" : "0.875rem" }}
            component="div"
          >
            {label}:
          </Typography>
        </Grid>
        <Grid item xs={fullWidth ? 12 : isMobile ? 7 : 8}>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: isMobile ? "0.85rem" : "0.875rem" }}
            component="div"
          >
            {value}
          </Typography>
        </Grid>
      </Grid>
    );

    const PersonCard: React.FC<{
      person: {
        firstname: string;
        lastname: string;
        dni: number;
        legajo: number;
        id: string;
        empresa?: { empresa: string; id: string };
      };
      subtitle?: string;
      additionalInfo?: string;
    }> = ({ person, subtitle, additionalInfo }) => (
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 1,
          borderRadius: 1,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
            <Person fontSize="small" />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight="medium">
              {person.firstname} {person.lastname}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              DNI: {person.dni} - Legajo: {person.legajo}
            </Typography>
            {person.empresa && (
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Empresa: {person.empresa.empresa}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                {subtitle}
              </Typography>
            )}
            {additionalInfo && (
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                {additionalInfo}
              </Typography>
            )}
          </Box>
        </Stack>
      </Paper>
    );

    const ChipList: React.FC<{
      items: Array<{ label: string; id: string }>;
      color?: "primary" | "secondary" | "success" | "warning" | "error";
    }> = ({ items, color = "primary" }) => (
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {items.map((item, index) => (
          <Chip
            key={item.id || `chip-${index}`}
            label={item.label}
            color={color}
            size="small"
            variant="outlined"
          />
        ))}
      </Stack>
    );

    const renderNovedades = () => {
      const novedades = [
        { type: "Equipajes", data: data.novEquipajes },
        { type: "Inspección", data: data.novInspeccion },
        { type: "Otras", data: data.novOtras },
      ];

      const activeNovedades = novedades.filter((nov) => nov.data?.isRequired);
      const hasNovedades = activeNovedades.length > 0;

      return (
        <InfoCard
          title="Novedades"
          icon={hasNovedades ? <Warning /> : <CheckCircle />}
          color={hasNovedades ? "warning" : "success"}
        >
          {hasNovedades ? (
            activeNovedades.map((novedad, index) => (
              <Paper
                key={`novedad-${novedad.type}-${index}`}
                elevation={1}
                sx={{
                  p: 2,
                  mb: 1,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Warning color="warning" fontSize="small" />
                  <Typography variant="subtitle2" fontWeight="medium">
                    {novedad.type}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {novedad.data?.observaciones.toUpperCase() ||
                    "Sin observaciones específicas"}
                </Typography>
              </Paper>
            ))
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircle color="success" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                No hay novedades registradas
              </Typography>
            </Stack>
          )}
        </InfoCard>
      );
    };

    return (
      <Box sx={{ maxWidth: "100%", mx: "auto" }}>
        {/* Success Message */}
        {isSuccessView && (
          <Alert
            severity="success"
            sx={{ mb: 3, borderRadius: 2 }}
            icon={<CheckCircle fontSize="inherit" />}
          >
            <Typography variant="body1" fontWeight="medium">
              ¡Planilla creada exitosamente!
            </Typography>
          </Alert>
        )}

        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "white",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Vuelo {data.datosVuelo.codVuelo?.codVuelo || "N/A"} -{" "}
            {formatDate(data.datosPsa.fecha)}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Empresa: {data.datosVuelo.empresa?.empresa || "N/A"}
          </Typography>
        </Paper>

        {/* PSA Information */}
        <InfoCard title="Información PSA" icon={<Assignment />}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DataRow label="Fecha" value={formatDate(data.datosPsa.fecha)} />
              <DataRow
                label="Hora Inicio"
                value={formatTime(data.datosPsa.horaIni)}
              />
              <DataRow
                label="Hora Fin"
                value={formatTime(data.datosPsa.horaFin)}
              />
              <DataRow label="Cantidad" value={String(data.datosPsa.cant)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataRow
                label="Responsable"
                value={`${
                  data.datosPsa.responsable?.firstname.toUpperCase() || "N/A"
                } ${
                  data.datosPsa.responsable?.lastname.toUpperCase() || "N/A"
                }`}
              />
              <DataRow
                label="Jerarquía"
                value={
                  data.datosPsa.responsable?.jerarquiaId?.label.toUpperCase() ||
                  "N/A"
                }
              />
              <DataRow
                label="DNI"
                value={data.datosPsa.responsable?.dni || "N/A"}
              />
              <DataRow
                label="Legajo"
                value={data.datosPsa.responsable?.legajo || "N/A"}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <DataRow label="Tipos de Control" value="" fullWidth />
          <Box sx={{ mb: 2 }}>
            <ChipList items={data.datosPsa.tipoControl || []} color="primary" />
          </Box>

          <DataRow label="Medios Técnicos" value="" fullWidth />
          <Box sx={{ mb: 2 }}>
            <ChipList items={data.datosPsa.medioTec || []} color="secondary" />
          </Box>

          <DataRow label="Tipos de Proceso" value="" fullWidth />
          <ChipList items={data.datosPsa.tipoPro || []} color="success" />
        </InfoCard>

        {/* Flight Information */}
        <InfoCard
          title="Información de Vuelo"
          icon={<Flight />}
          color="secondary"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DataRow
                label="Código de Vuelo"
                value={data.datosVuelo.codVuelo?.codVuelo || "N/A"}
              />
              <DataRow
                label="Empresa"
                value={data.datosVuelo.empresa?.empresa || "N/A"}
              />
              <DataRow
                label="Tipo de Vuelo"
                value={data.datosVuelo.tipoVuelo?.label.toUpperCase() || "N/A"}
              />
              <DataRow label="Posición" value={data.datosVuelo.posicion} />
              <DataRow
                label="Matrícula Aeronave"
                value={
                  data.datosVuelo.matriculaAeronave?.matriculaAeronave || "N/A"
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataRow
                label="Origen"
                value={
                  <Box>
                    <Typography variant="body2" component="span">
                      {data.datosVuelo.codVuelo?.origen?.codIATA.toUpperCase()}
                    </Typography>
                    {data.datosVuelo.codVuelo?.origen?.codOACI && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        {data.datosVuelo.codVuelo?.origen?.codOACI.toUpperCase()}
                      </Typography>
                    )}
                  </Box>
                }
              />
              <DataRow
                label="Destino"
                value={
                  <Box>
                    <Typography variant="body2" component="span">
                      {data.datosVuelo.codVuelo?.destino?.codIATA.toUpperCase()}
                    </Typography>
                    {data.datosVuelo.codVuelo?.destino?.codOACI && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        {data.datosVuelo.codVuelo?.destino?.codOACI.toUpperCase()}
                      </Typography>
                    )}
                  </Box>
                }
              />
              {data.datosVuelo.horaArribo && (
                <DataRow
                  label="Hora Arribo"
                  value={formatTime(data.datosVuelo.horaArribo)}
                />
              )}
              {data.datosVuelo.horaPartida && (
                <DataRow
                  label="Hora Partida"
                  value={formatTime(data.datosVuelo.horaPartida)}
                />
              )}
              <DataRow
                label="Demora"
                value={data.datosVuelo.demora?.label || "N/A"}
              />
            </Grid>
          </Grid>
        </InfoCard>

        {/* Personnel Information */}
        <InfoCard title="Personal Terrestre" icon={<Group />} color="success">
          {data.datosTerrestre?.map((item) => (
            <Box key={`terrestre-${item._id}`} sx={{ mb: 2 }}>
              {item.personalEmpresa?.map((person) => (
                <PersonCard
                  key={`terrestre-person-${person.id}`}
                  person={person}
                  subtitle={`${item.funcion?.label || "N/A"} - Grupo ${
                    item.grupo
                  }`}
                />
              ))}
            </Box>
          ))}
        </InfoCard>

        {/* Security Personnel */}
        <InfoCard
          title="Personal de Seguridad"
          icon={<Security />}
          color="warning"
        >
          {data.datosSeguridad?.map((item) => (
            <Box key={`seguridad-${item.id}`} sx={{ mb: 2 }}>
              {item.personalSegEmpresa?.map((person) => (
                <PersonCard
                  key={`seguridad-person-${person.id}`}
                  person={person}
                  additionalInfo={`Empresa: ${
                    item.empresaSeguridad?.empresa || "N/A"
                  }`}
                />
              ))}
            </Box>
          ))}
        </InfoCard>

        {/* Vehicles */}
        <InfoCard title="Vehículos" icon={<DirectionsCar />} color="error">
          {data.datosVehiculos?.map((item) => (
            <Paper
              key={`vehiculo-${item._id}`}
              elevation={1}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 1,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "error.main", width: 32, height: 32 }}>
                  <DirectionsCar fontSize="small" />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight="medium">
                    {item.vehiculo?.numInterno || "N/A"} -{" "}
                    {item.vehiculo?.tipoVehiculo?.label.toUpperCase() || "N/A"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Empresa: {item.vehiculo?.empresa?.empresa || "N/A"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Operador: {item.operadorVehiculo?.firstname || "N/A"}{" "}
                    {item.operadorVehiculo?.lastname || "N/A"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    DNI: {item.operadorVehiculo?.dni || "N/A"} - Legajo:{" "}
                    {item.operadorVehiculo?.legajo || "N/A"}
                  </Typography>
                  {item.isObservaciones && item.observacionesVehiculo && (
                    <Typography
                      variant="caption"
                      color="warning.main"
                      display="block"
                    >
                      Observaciones: {item.observacionesVehiculo}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Paper>
          ))}
        </InfoCard>

        {/* Novedades */}
        {renderNovedades()}

        {/* Metadata */}
        <InfoCard title="Información del Sistema" icon={<Info />}>
          <DataRow
            label="Creado"
            value={new Date(data.createdAt).toLocaleString()}
          />
          <DataRow
            label="Actualizado"
            value={new Date(data.updatedAt).toLocaleString()}
          />
        </InfoCard>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      disableEnforceFocus={false}
      disableAutoFocus={false}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: isMobile ? 0 : 2,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Detalles de Planilla
        </Typography>
        <Button
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            size: "small",
          }}
          startIcon={<Close />}
        >
          {isSuccessView ? "Inicio" : "Cerrar"}
        </Button>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {renderContent()}
        {isSuccessView && !isLoading && !isError && data && (
          <SuccessHelpModal
            open={showSuccessHelp}
            onClose={handleSuccessHelpClose}
          />
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          color: theme.palette.primary.main,
          backgroundColor: `${theme.palette.primary.main}20`,
        }}
      >
        {data && <PlanillaPDFGenerator planillaData={data} />}
        {isSuccessView && (
          <Button
            variant="contained"
            color="success"
            onClick={onClose}
            startIcon={<Home />}
            sx={{ ml: 2 }}
          >
            Finalizar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
