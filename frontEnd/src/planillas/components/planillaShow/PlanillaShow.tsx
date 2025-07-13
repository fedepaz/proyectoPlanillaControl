"use client";

import type React from "react";
import { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
  Divider,
} from "@mui/material";
import {
  Assignment,
  Visibility,
  FlightTakeoff,
  FlightLand,
  AccessTime,
  Business,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { usePlanillas } from "../../services/planillas";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import { PlanillaCard } from "../planillaComponents/components/planillaCard";
import { PaginationControls } from "../planillaComponents/components/paginationControls";
import { DateFilter } from "../planillaComponents/components/dateFilter";

import {
  DateFilters,
  ProcessedPlanillaData,
  processPlantillaData,
  DEFAULT_PAGE_SIZE,
  PLANILLA_POPULATE_FIELDS,
  formatDateTime,
} from "../../types/searchTypes";

export const PlanillasList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [dateFilters, setDateFilters] = useState<DateFilters>({});
  const [expandedPlanilla, setExpandedPlanilla] = useState<string | null>(null);
  const pageSize = DEFAULT_PAGE_SIZE;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { data, isLoading, isError, error } = usePlanillas({
    page,
    pageSize,
    ...dateFilters,
    populate: PLANILLA_POPULATE_FIELDS,
  });

  const processedData: ProcessedPlanillaData[] = useMemo(() => {
    if (!data?.data) return [];
    return processPlantillaData(data.data);
  }, [data?.data]);

  const getFlightTypeIcon = (
    horaArribo: string | undefined,
    horaPartida: string | undefined
  ): React.ReactElement => {
    if (horaArribo && horaPartida) return <FlightTakeoff color="primary" />;
    if (horaArribo) return <FlightLand color="success" />;
    if (horaPartida) return <FlightTakeoff color="warning" />;
    return <AccessTime color="disabled" />;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (filters: DateFilters) => {
    setDateFilters(filters);
    setPage(1);
  };

  const handleViewPlanilla = (id: string) => {
    console.log("View planilla:", id);
  };

  const handleToggleExpand = (planillaId: string) => {
    setExpandedPlanilla(expandedPlanilla === planillaId ? null : planillaId);
  };

  if (isLoading) return <Loading />;

  if (isError) return <ErrorPage error={error} />;

  if (!data || data.data.length === 0) {
    return (
      <Container
        maxWidth={isMobile ? "sm" : isTablet ? "md" : "lg"}
        sx={{ py: 3 }}
      >
        <DateFilter onFilterChange={handleFilterChange} />

        <Paper
          elevation={isMobile ? 1 : 2}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: isMobile ? 2 : 1,
          }}
        >
          <Assignment sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No hay planillas disponibles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Object.keys(dateFilters).length > 0
              ? "No se encontraron planillas con los filtros especificados."
              : "No se encontraron planillas."}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Lista de Planillas
        </Typography>
        <Stack
          direction={isMobile ? "row" : "column"}
          spacing={2}
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            {data.totalCount} planillas encontradas
            {Object.keys(dateFilters).length > 0 && " (filtradas)"}
          </Typography>
          {data.totalCount > 0 && (
            <Chip
              icon={<Assignment />}
              label={`Página ${data.currentPage} de ${data.totalPages}`}
              variant="outlined"
              size="small"
            />
          )}
        </Stack>
      </Box>

      {/* Date Filter */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DateFilter onFilterChange={handleFilterChange} />
      </Box>

      {/* Mobile View - Compact List */}
      {isMobile ? (
        <Paper sx={{ borderRadius: 2 }}>
          <List disablePadding>
            {processedData.map((planilla, index) => (
              <Box key={planilla.id}>
                <ListItem
                  button
                  onClick={() => handleToggleExpand(planilla.id)}
                  sx={{
                    py: 2,
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="medium">
                        {planilla.formattedDate}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        Creado: {formatDateTime(planilla.createdAt)}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleToggleExpand(planilla.id)}
                    >
                      {expandedPlanilla === planilla.id ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <Collapse
                  in={expandedPlanilla === planilla.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box sx={{ px: 2, pb: 2 }}>
                    <PlanillaCard planilla={planilla} isMobile={isMobile} />
                  </Box>
                </Collapse>

                {index < processedData.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      ) : (
        /* Desktop View - Table (unchanged) */
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
          <Table size={isTablet ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Fecha
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Business fontSize="small" />
                    <span>Empresa</span>
                  </Stack>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Código de Vuelo
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Responsable
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Horarios
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Posición
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Novedades
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processedData.map((planilla) => (
                <TableRow
                  key={planilla.id}
                  hover
                  sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                >
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography variant="body2" fontWeight="medium">
                      {planilla.formattedDate}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Business fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {planilla.empresa}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip
                      label={planilla.codVuelo}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography variant="body2">
                      {planilla.responsable}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Stack spacing={0.5}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getFlightTypeIcon(
                          planilla.datosVuelo.horaArribo,
                          planilla.datosVuelo.horaPartida
                        )}
                        <Typography variant="caption">
                          {planilla.formattedHoraIni} -{" "}
                          {planilla.formattedHoraFin}
                        </Typography>
                      </Stack>
                      {planilla.datosVuelo.horaArribo && (
                        <Typography variant="caption" color="success.main">
                          Arribo: {planilla.formattedHoraArribo}
                        </Typography>
                      )}
                      {planilla.datosVuelo.horaPartida && (
                        <Typography variant="caption" color="warning.main">
                          Partida: {planilla.formattedHoraPartida}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip
                      label={planilla.datosVuelo.posicion || "N/A"}
                      size="small"
                      variant="filled"
                      color="secondary"
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {planilla.novedadesCount > 0 ? (
                      <Chip
                        label={`${planilla.novedadesCount} novedad${
                          planilla.novedadesCount > 1 ? "es" : ""
                        }`}
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        Sin novedades
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Tooltip title="Ver planilla">
                      <IconButton
                        size="small"
                        onClick={() => handleViewPlanilla(planilla.id)}
                        color="primary"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      {data.totalPages > 1 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <PaginationControls
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            totalCount={data.totalCount}
            onPageChange={handlePageChange}
            isMobile={isMobile}
          />
        </Box>
      )}
    </Container>
  );
};
