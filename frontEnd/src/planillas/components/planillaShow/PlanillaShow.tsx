"use client";

import type React from "react";
import { useMemo, useState } from "react";

import Assignment from "@mui/icons-material/Assignment";

import { usePlanillas } from "../../services/planillas";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import { PlanillaMobileList } from "../planillaComponents/components/planillaMobileList";
import { PlanillasTable } from "../planillaComponents/components/planillasTableShow";
import { PaginationControls } from "../planillaComponents/components/paginationControls";
import { DateFilter } from "../planillaComponents/components/dateFilter";

import {
  DateFilters,
  ProcessedPlanillaData,
  processPlantillaData,
  DEFAULT_PAGE_SIZE,
  PLANILLA_POPULATE_FIELDS,
} from "../../types/searchTypes";
import { PlanillaModal } from "../planillaComponents/components/planillaModal";
import { PlanillaDetailById } from "../planillaComponents/components/planillaDetailById";
import {
  useTheme,
  useMediaQuery,
  Container,
  Paper,
  Typography,
  Box,
  Stack,
} from "@mui/material";

interface DateFiltersResponse {
  fechaDesde?: string;
  fechaHasta?: string;
}

const PlanillasList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [dateFilters, setDateFilters] = useState<DateFilters>({
    fechaHasta: new Date().toISOString().split("T")[0],
  });
  const [hasSearched, setHasSearched] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanilla, setSelectedPlanilla] =
    useState<ProcessedPlanillaData | null>(null);

  const [selectedPlanillaId, setSelectedPlanillaId] = useState<string>("");
  const [planillaDetailByIdOpen, setPlanillaDetailByIdOpen] = useState(false);

  const pageSize = DEFAULT_PAGE_SIZE;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { data, isLoading, isError, error } = usePlanillas({
    page,
    pageSize,
    ...dateFilters,
    populate: PLANILLA_POPULATE_FIELDS,
    enabled: hasSearched,
  });

  const processedData: ProcessedPlanillaData[] = useMemo(() => {
    if (!data?.data) return [];
    return processPlantillaData(data.data);
  }, [data?.data]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (filters: DateFiltersResponse) => {
    const { fechaDesde, fechaHasta } = filters;
    if (!fechaHasta || fechaHasta === undefined) return;
    setDateFilters({ fechaDesde, fechaHasta });
    setPage(1);
    setHasSearched(true);
  };

  const handleViewPlanillaModal = (planilla: ProcessedPlanillaData) => {
    setSelectedPlanilla(planilla);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPlanilla(null);
    setModalOpen(false);
  };

  const handleViewPlanillaDetailById = (planillaId: string) => {
    setSelectedPlanillaId(planillaId);
    setPlanillaDetailByIdOpen(true);
    setSelectedPlanilla(null);
    setModalOpen(false);
  };

  const handleClosePlanillaDetailById = () => {
    setSelectedPlanillaId("");
    setPlanillaDetailByIdOpen(false);
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
        <Stack
          direction={isMobile ? "row" : "column"}
          spacing={2}
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            {data.totalCount} planillas encontradas
            {Object.keys(dateFilters).length > 0 && " (filtradas)"}
          </Typography>
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
          onView={handleViewPlanillaModal}
        />
      ) : (
        /* Desktop View - Table (unchanged) */
        <PlanillasTable
          planillas={processedData}
          onView={handleViewPlanillaModal}
        />
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

      {/* Planilla Modal */}
      <PlanillaModal
        onView={handleViewPlanillaDetailById}
        open={modalOpen}
        planilla={selectedPlanilla}
        onClose={handleCloseModal}
      />

      {/* Planilla Detail by ID */}
      <PlanillaDetailById
        open={planillaDetailByIdOpen}
        planillaId={selectedPlanillaId}
        onClose={handleClosePlanillaDetailById}
      />
    </Container>
  );
};

export default PlanillasList;
