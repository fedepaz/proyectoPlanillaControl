/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  formatResponsableName,
  formatPersonalEmpresaNames,
  formatPersonalSeguridadNames,
  formatTipoControlLabels,
  formatMedioTecLabels,
  formatTipoProLabels,
  formatRoute,
} from "../../types/searchById";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  Divider,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  FormLabel,
  FormControlLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  Chip,
  Stack,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import { usePlanillaID } from "../../services/planillas";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/Error";

const printStyles = `
  @media print {
    @page {
      size: A4;
      margin: 0.5cm;
    }
    body {
      font-size: 12px;
    }
    .MuiTextField-root input,
    .MuiTextField-root textarea {
      border: none !important;
      box-shadow: none !important;
    }
  }
`;

interface WarehouseControlFormMUIProps {
  planillaDataId: string;
  readOnly?: boolean;
  onBack: () => void;
}

export default function WarehouseControlFormMUI({
  planillaDataId,
  readOnly = false,
  onBack,
}: WarehouseControlFormMUIProps) {
  const { data, isLoading, isError, error } = usePlanillaID(planillaDataId);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <Loading />;

  if (isError) return <ErrorPage error={error} />;

  if (!data) {
    const error = new Error();
    error.name = "PlanillaNotFound";
    error.message = "Planilla not found";
    return <ErrorPage error={error} />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            "@media print": { display: "none" },
          }}
        >
          <Typography variant="h4" component="h1">
            Planilla de Control de Bodega UOSP Metropolitana
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Print />}
              onClick={handlePrint}
            >
              Imprimir
            </Button>

            <Button variant="contained" color="primary" onClick={onBack}>
              Regresar
            </Button>
          </Box>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            "@media print": { boxShadow: "none", border: "2px solid black" },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              borderBottom: "2px solid black",
              pb: 2,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: "grey.300",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                PSA LOGO
              </Typography>
            </Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: "center", fontWeight: "bold", flex: 1, mx: 2 }}
            >
              PLANILLA DE CONTROL DE BODEGA UOSP METROPOLITANA
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: "grey.300",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                OFFICIAL LOGO
              </Typography>
            </Box>
          </Box>

          {/* Patrol and Service Order */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PATRULLA"
                variant="outlined"
                size="small"
                InputProps={{ readOnly }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="ORDEN DE SERVICIO Nro"
                variant="outlined"
                size="small"
                value={data.id || ""}
                InputProps={{ readOnly }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Año"
                variant="outlined"
                size="small"
                value={new Date(data.createdAt).getFullYear()}
                InputProps={{ readOnly }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2, borderWidth: 2, borderColor: "black" }} />

          {/* PSA Control Data */}
          <Card sx={{ mb: 3, border: "2px solid black" }}>
            <CardHeader
              title="DATOS DEL CONTROL PSA"
              sx={{
                bgcolor: "grey.100",
                textAlign: "center",
                "& .MuiCardHeader-title": { fontWeight: "bold" },
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Control"
                    type="date"
                    value={data.datosPsa.fecha}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Hora de Inicio (HHMM)"
                    value={data.datosPsa.horaIni || ""}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Cantidad Personal"
                    InputProps={{ readOnly }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Responsable PSA"
                    value={formatResponsableName(data.datosPsa.responsable)}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Jerarquía"
                    value={data.datosPsa.responsable.jerarquiaId.label}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Hora de Finalización (HHMM)"
                    value={data.datosPsa.horaFin || ""}
                    InputProps={{ readOnly }}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Tipos de Controles</FormLabel>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{ mt: 1 }}
                    >
                      {formatTipoControlLabels(data.datosPsa.tipoControl).map(
                        (tipo) => (
                          <Chip
                            key={tipo}
                            label={tipo}
                            size="small"
                            color="primary"
                          />
                        )
                      )}
                    </Stack>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Medios Técnicos</FormLabel>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{ mt: 1 }}
                    >
                      {formatMedioTecLabels(data.datosPsa.medioTec).map(
                        (medio) => (
                          <Chip
                            key={medio}
                            label={medio}
                            size="small"
                            color="secondary"
                          />
                        )
                      )}
                    </Stack>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Tipo Procedimiento</FormLabel>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{ mt: 1 }}
                    >
                      {formatTipoProLabels(data.datosPsa.tipoPro).map(
                        (tipo) => (
                          <Chip
                            key={tipo}
                            label={tipo}
                            size="small"
                            color="info"
                          />
                        )
                      )}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Flight Data */}
          <Card sx={{ mb: 3, border: "2px solid black" }}>
            <CardHeader
              title="DATOS DEL VUELO"
              sx={{
                bgcolor: "grey.100",
                textAlign: "center",
                "& .MuiCardHeader-title": { fontWeight: "bold" },
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Empresa"
                    value={data.datosVuelo.empresa.empresa}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Origen"
                    value={data.datosVuelo.codVuelo.origen.aeropuerto}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Hora Arribo (HHMM)"
                    value={data.datosVuelo.horaArribo || ""}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Con demora</FormLabel>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {data.datosVuelo.demora.label}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Código de Vuelo"
                    value={data.datosVuelo.codVuelo.codVuelo}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Destino"
                    value={data.datosVuelo.codVuelo.destino.aeropuerto}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Hora de Partida (HHMM)"
                    value={data.datosVuelo.horaPartida || ""}
                    InputProps={{ readOnly }}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Tipo de Vuelo</FormLabel>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {data.datosVuelo.tipoVuelo.label}
                    </Typography>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Matrícula Aeronave"
                    value={data.datosVuelo.matriculaAeronave.matriculaAeronave}
                    InputProps={{ readOnly }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Posición Plataforma"
                    value={data.datosVuelo.posicion}
                    InputProps={{ readOnly }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Ruta"
                    value={formatRoute(data.datosVuelo.codVuelo)}
                    InputProps={{ readOnly }}
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Ground Support Personnel */}
          <Card sx={{ mb: 3, border: "2px solid black" }}>
            <CardHeader
              title="DATOS DEL PERSONAL DE APOYO TERRESTRE EMPRESA"
              sx={{
                bgcolor: "grey.100",
                textAlign: "center",
                "& .MuiCardHeader-title": { fontWeight: "bold" },
              }}
            />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Personal Empresa</TableCell>
                      <TableCell>Empresa</TableCell>
                      <TableCell>Función</TableCell>
                      <TableCell>Grupo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.datosTerrestre.map((terrestre) => (
                      <TableRow key={terrestre._id}>
                        <TableCell>
                          <Typography variant="body2">
                            {formatPersonalEmpresaNames(
                              terrestre.personalEmpresa
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {terrestre.personalEmpresa[0]?.empresa?.empresa ||
                              "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {terrestre.funcion.label}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={terrestre.grupo}
                            InputProps={{ readOnly }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Security Personnel */}
          <Card sx={{ mb: 3, border: "2px solid black" }}>
            <CardHeader
              title="DATOS DEL PERSONAL DE SEGURIDAD"
              sx={{
                bgcolor: "grey.100",
                textAlign: "center",
                "& .MuiCardHeader-title": { fontWeight: "bold" },
              }}
            />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Personal Seguridad</TableCell>
                      <TableCell>Empresa Seguridad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.datosSeguridad.map((security) => (
                      <TableRow key={security.id}>
                        <TableCell>
                          <Typography variant="body2">
                            {formatPersonalSeguridadNames(
                              security.personalSegEmpresa
                            ).join(", ")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {security.empresaSeguridad.empresa}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Controlled Vehicles */}
          <Card sx={{ mb: 3, border: "2px solid black" }}>
            <CardHeader
              title="DATOS DE LOS VEHICULOS CONTROLADOS"
              sx={{
                bgcolor: "grey.100",
                textAlign: "center",
                "& .MuiCardHeader-title": { fontWeight: "bold" },
              }}
            />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tipo Vehículo</TableCell>
                      <TableCell>Número Interno</TableCell>
                      <TableCell>Empresa</TableCell>
                      <TableCell>Operador</TableCell>
                      <TableCell>Observaciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.datosVehiculos.map((vehicle) => (
                      <TableRow key={vehicle._id}>
                        <TableCell>
                          <Typography variant="body2">
                            {vehicle.vehiculo.tipoVehiculo.label}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {vehicle.vehiculo.numInterno}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {vehicle.vehiculo.empresa.empresa}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {`${vehicle.operadorVehiculo.firstname} ${vehicle.operadorVehiculo.lastname}`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={vehicle.observacionesVehiculo}
                            InputProps={{ readOnly }}
                            sx={{ mt: 1 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Notes Sections */}
          <Card sx={{ mb: 3, border: "2px solid black" }}>
            <CardHeader
              title="NOVEDADES"
              sx={{
                bgcolor: "grey.100",
                textAlign: "center",
                "& .MuiCardHeader-title": { fontWeight: "bold" },
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.novEquipajes.isRequired}
                        disabled={readOnly}
                      />
                    }
                    label="Novedades sobre Equipajes/Cargas"
                  />
                  {data.novEquipajes.isRequired && (
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Observaciones Equipajes"
                      value={data.novEquipajes.observaciones}
                      InputProps={{ readOnly }}
                      sx={{ mt: 1 }}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.novInspeccion.isRequired}
                        disabled={readOnly}
                      />
                    }
                    label="Novedades sobre Inspección"
                  />
                  {data.novInspeccion.isRequired && (
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Observaciones Inspección"
                      value={data.novInspeccion.observaciones}
                      InputProps={{ readOnly }}
                      sx={{ mt: 1 }}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.novOtras.isRequired}
                        disabled={readOnly}
                      />
                    }
                    label="Otras Novedades"
                  />
                  {data.novOtras.isRequired && (
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Otras Observaciones"
                      value={data.novOtras.observaciones}
                      sx={{ mt: 1 }}
                    />
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </>
  );
}
