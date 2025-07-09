"use client";

import type React from "react";
import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  Stack,
} from "@mui/material";
import { Assignment } from "@mui/icons-material";
import { usePlanillas } from "../../services/planillas";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import { PlanillaCard } from "../planillaComponents/components/planillaCard";
import { PaginationControls } from "../planillaComponents/components/paginationControls";
import { DateFilter } from "../planillaComponents/components/dateFilter";
interface DateFilters {
  fechaDesde?: string;
  fechaHasta?: string;
}

export const PlanillasList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [dateFilters, setDateFilters] = useState<DateFilters>({});
  const pageSize = 10;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { data, isLoading, isError, error } = usePlanillas({
    page, // Fixed: now using the page state
    pageSize,
    ...dateFilters, // Spread the date filters
    populate: ["datosPsa.responsable", "datosVuelo.codVuelo"],
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (filters: DateFilters) => {
    setDateFilters(filters);
    setPage(1);
  };

  if (isLoading) return <Loading />;

  if (isError) return <ErrorPage error={error} />;

  if (!data || data.data.length === 0) {
    return (
      <Container
        maxWidth={isMobile ? "sm" : isTablet ? "md" : "lg"}
        sx={{ py: 3 }}
      >
        {/* Date Filter */}
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
    <Container
      maxWidth={isMobile ? "sm" : isTablet ? "md" : "lg"}
      sx={{
        px: isMobile ? 1 : 2,
        py: 3,
      }}
    >
      {/* Header */}
      <Paper
        elevation={isMobile ? 1 : 2}
        sx={{
          p: isMobile ? 2 : 3,
          mb: 3,
          borderRadius: isMobile ? 2 : 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexDirection: isMobile ? "column" : "row",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Assignment color="primary" sx={{ fontSize: isMobile ? 32 : 28 }} />
          <Box>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              gutterBottom
            >
              Lista de Planillas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.totalCount} planillas encontradas
              {Object.keys(dateFilters).length > 0 && " (filtradas)"}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Date Filter */}
      <DateFilter onFilterChange={handleFilterChange} isMobile={isMobile} />

      {/* Planillas List */}
      <Stack spacing={0}>
        {data.data.map((planilla) => (
          <PlanillaCard
            key={planilla._id} // Fixed: using _id instead of id
            planilla={planilla}
            isMobile={isMobile}
          />
        ))}
      </Stack>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <Paper
          elevation={1}
          sx={{
            mt: 3,
            borderRadius: isMobile ? 2 : 1,
          }}
        >
          <PaginationControls
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            totalCount={data.totalCount}
            onPageChange={handlePageChange}
            isMobile={isMobile}
          />
        </Paper>
      )}
    </Container>
  );
};
