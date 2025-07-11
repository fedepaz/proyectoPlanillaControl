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
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  console.log(data);

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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Encabezado */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Planillas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.totalCount} planillas encontradas
          {Object.keys(dateFilters).length > 0 && " (filtradas)"}
        </Typography>
      </Box>

      {/* Filtro por fecha */}
      <DateFilter onFilterChange={handleFilterChange} />

      {/* Tabla */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Código de Vuelo</TableCell>
              <TableCell>Responsable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((planilla) => (
              <TableRow key={planilla.id}>
                <TableCell>{planilla.datosPsa.fecha?.slice(0, 10)}</TableCell>
                <TableCell>
                  {typeof planilla.datosVuelo.empresa === "object"
                    ? planilla.datosVuelo.empresa
                    : planilla.datosVuelo.empresa}
                </TableCell>
                <TableCell>
                  {typeof planilla.datosVuelo.codVuelo === "object"
                    ? planilla.datosVuelo.codVuelo
                    : planilla.datosVuelo.codVuelo}
                </TableCell>
                <TableCell>
                  {typeof planilla.datosPsa.responsable === "object"
                    ? planilla.datosPsa.responsable
                    : planilla.datosPsa.responsable}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      {data.totalPages > 1 && (
        <Box sx={{ mt: 3 }}>
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
