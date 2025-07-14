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
} from "@mui/icons-material";
import { usePlanillas } from "../../services/planillas";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import {
  PlanillaCard,
  PlanillaMobileItem,
  PlanillaMobileList,
} from "../planillaComponents/components/planillaMobileList";
import { PaginationControls } from "../planillaComponents/components/paginationControls";
import { DateFilter } from "../planillaComponents/components/dateFilter";

import {
  DateFilters,
  ProcessedPlanillaData,
  processPlantillaData,
  DEFAULT_PAGE_SIZE,
  PLANILLA_POPULATE_FIELDS,
} from "../../types/searchTypes";
import { PlanillasTable } from "../planillaComponents/components/planillasTableShow";

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
        <PlanillaMobileList
          planillas={processedData}
          onView={handleViewPlanilla}
        />
      ) : (
        /* Desktop View - Table (unchanged) */
        <PlanillasTable planillas={processedData} onView={handleViewPlanilla} />
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
