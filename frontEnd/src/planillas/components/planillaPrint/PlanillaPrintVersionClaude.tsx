import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { PlanillaSchema } from "../../types/planillaSchema";

interface WarehouseControlFormMUIProps {
  formData: PlanillaSchema;
  onBack: () => void;
  isSubmitting?: boolean;
}

export default function WarehouseControlFormMUI({
  formData,
  onBack,
  isSubmitting = false,
}: WarehouseControlFormMUIProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box
      sx={{
        maxWidth: "210mm",
        margin: "0 auto",
        p: 2,
        "@media print": { p: 0 },
      }}
    >
      <Paper elevation={0} sx={{ p: 3, border: "2px solid #000" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              border: "2px solid #000",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              PSA
            </Typography>
          </Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{ flex: 1, mx: 2 }}
          >
            PLANILLA DE CONTROL DE BODEGA UOSP METROPOLITANA
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 60,
              border: "2px solid #000",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" textAlign="center">
              LOGO
            </Typography>
          </Box>
        </Box>

        {/* Patrulla y Orden 
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="PATRULLA:"
              variant="outlined"
              size="small"
              value={formData.patrulla}
              onChange={(e) => handleInputChange("patrulla", e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { height: 40 } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="ORDEN DE SERVICIO Nro:"
              variant="outlined"
              size="small"
              value={formData.ordenServicio}
              onChange={(e) =>
                handleInputChange("ordenServicio", e.target.value)
              }
              sx={{ "& .MuiOutlinedInput-root": { height: 40 } }}
              InputProps={{
                endAdornment: <Typography>/2024.</Typography>,
              }}
            />
          </Grid>
        </Grid>
                  */}

        {/* Datos del Control PSA */}
        <Box sx={{ border: "2px solid #000", mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              bgcolor: "#f0f0f0",
              p: 0.5,
              fontWeight: "bold",
              borderBottom: "1px solid #000",
            }}
          >
            DATOS DEL CONTROL PSA
          </Typography>

          <Grid container spacing={1} sx={{ p: 1 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Fecha de Control:"
                type="date"
                variant="outlined"
                size="small"
                value={formData.datosPsa.fecha}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Responsable PSA:"
                variant="outlined"
                size="small"
                value={formData.datosPsa.responsable}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Hora de Inicio:"
                variant="outlined"
                size="small"
                placeholder="HHMM"
                value={formData.datosPsa.horaIni}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Hora de Finalización:"
                variant="outlined"
                size="small"
                placeholder="HHMM"
                value={formData.datosPsa.horaFin}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ p: 1 }}>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Cantidad Personal:"
                variant="outlined"
                size="small"
                value={formData.datosPsa.cant}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset" size="small">
                <FormLabel component="legend" sx={{ fontSize: 12 }}>
                  Tipos de Controles:
                </FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">Personas</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">Equipos</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">Cargas</Typography>}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl component="fieldset" size="small">
                <FormLabel component="legend" sx={{ fontSize: 12 }}>
                  Medios Técnicos:
                </FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">Móvil</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">Paletas</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">Otros</Typography>}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset" size="small">
                <FormLabel component="legend" sx={{ fontSize: 12 }}>
                  Tipo Procedimiento:
                </FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">OSVC</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">Aleatorio</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption">Rutina</Typography>}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Datos del Vuelo */}
        <Box sx={{ border: "2px solid #000", mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              bgcolor: "#f0f0f0",
              p: 0.5,
              fontWeight: "bold",
              borderBottom: "1px solid #000",
            }}
          >
            DATOS DEL VUELO:
          </Typography>

          <Grid container spacing={1} sx={{ p: 1 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Empresa:"
                variant="outlined"
                size="small"
                value={formData.datosVuelo.empresa}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Código de Vuelo:"
                variant="outlined"
                size="small"
                value={formData.datosVuelo.codVuelo}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Origen:"
                variant="outlined"
                size="small"
                value={formData.datosVuelo.codVuelo}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Destino:"
                variant="outlined"
                size="small"
                value={formData.datosVuelo.codVuelo}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ p: 1 }}>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Hora Arribo:"
                variant="outlined"
                size="small"
                placeholder="HHMM"
                value={formData.datosVuelo.horaArribo}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Hora de Partida:"
                variant="outlined"
                size="small"
                placeholder="HHMM"
                value={formData.datosVuelo.horaPartida}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Con demora:</InputLabel>

                <MenuItem value="SI">SI</MenuItem>
                <MenuItem value="NO">NO</MenuItem>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Vuelo:</InputLabel>

                <MenuItem value="Arribo">Arribo</MenuItem>
                <MenuItem value="Salida">Salida</MenuItem>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Matrícula Aeronave:"
                variant="outlined"
                size="small"
                value={formData.datosVuelo.matriculaAeronave}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Posición Plataforma:"
                variant="outlined"
                size="small"
                value={formData.datosVuelo.posicion}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Personal Terrestre */}
        <Box sx={{ border: "2px solid #000", mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              bgcolor: "#f0f0f0",
              p: 0.5,
              fontWeight: "bold",
              borderBottom: "1px solid #000",
            }}
          >
            DATOS DEL PERSONAL DE APOYO TERRESTRE EMPRESA:
          </Typography>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Apellido y Nombre:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    DNI:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Legajo:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Función:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Grupo:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.datosTerrestre.map((person, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.personalEmpresa}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.personalEmpresa}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.personalEmpresa}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.funcion}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.grupo}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Personal de Seguridad */}
        <Box sx={{ border: "2px solid #000", mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              bgcolor: "#f0f0f0",
              p: 0.5,
              fontWeight: "bold",
              borderBottom: "1px solid #000",
            }}
          >
            DATOS DEL PERSONAL DE SEGURIDAD:
          </Typography>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Apellido y Nombre:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    DNI:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Legajo:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Empresa:
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000", fontSize: 10 }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.datosSeguridad.map((person, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.personalSegEmpresa}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.personalSegEmpresa}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.personalSegEmpresa}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #000", p: 0.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        value={person.empresaSeguridad}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Vehículos */}
        <Box sx={{ border: "2px solid #000", mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              bgcolor: "#f0f0f0",
              p: 0.5,
              fontWeight: "bold",
              borderBottom: "1px solid #000",
            }}
          >
            DATOS DE LOS VEHÍCULOS CONTROLADOS:
          </Typography>

          {formData.datosVehiculos.map((vehiculo, index) => (
            <Grid
              container
              spacing={1}
              sx={{
                p: 1,
                borderBottom:
                  index < formData.datosVehiculos.length - 1
                    ? "1px solid #ccc"
                    : "none",
              }}
              key={index}
            >
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Tipo de Vehículo:"
                  variant="outlined"
                  size="small"
                  value={vehiculo.vehiculo}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Nº Interno:"
                  variant="outlined"
                  size="small"
                  value={vehiculo.vehiculo}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Empresa:"
                  variant="outlined"
                  size="small"
                  value={vehiculo.vehiculo}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Operador:"
                  variant="outlined"
                  size="small"
                  value={vehiculo.operadorVehiculo}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Observaciones:"
                  variant="outlined"
                  size="small"
                  value={vehiculo.observacionesVehiculo}
                />
              </Grid>
            </Grid>
          ))}
        </Box>

        {/* Novedades */}
        <Box sx={{ border: "2px solid #000", mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              bgcolor: "#f0f0f0",
              p: 0.5,
              fontWeight: "bold",
              borderBottom: "1px solid #000",
            }}
          >
            NOVEDADES SOBRE LOS EQUIPAJES/CARGAS DESPACHADAS.
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.novEquipajes.observaciones}
            sx={{ m: 1, width: "calc(100% - 16px)" }}
          />
        </Box>

        {/* Print Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            "@media print": { display: "none" },
          }}
        >
          <Button
            disabled={isSubmitting}
            variant="contained"
            onClick={handlePrint}
            sx={{ mr: 2 }}
          >
            Imprimir Formulario
          </Button>
          <Button variant="outlined" onClick={onBack} disabled={isSubmitting}>
            Regresar
          </Button>
        </Box>
      </Paper>

      <style>
        {`
          @media print {
            body { margin: 0; }
            @page { size: A4; margin: 10mm; }
          }
        `}
      </style>
    </Box>
  );
}
