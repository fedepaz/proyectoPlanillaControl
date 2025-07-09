"use client";
import { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  useTheme,
  Collapse,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  FilterList,
  ExpandMore,
  ExpandLess,
  Search,
  Clear,
} from "@mui/icons-material";

interface DateFilterProps {
  onFilterChange: (filters: {
    fechaDesde?: string;
    fechaHasta?: string;
  }) => void;
}

export function DateFilter({ onFilterChange }: DateFilterProps) {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleApplyFilter = () => {
    const filters: { fechaDesde?: string; fechaHasta?: string } = {};

    if (fechaDesde) filters.fechaDesde = fechaDesde;
    if (fechaHasta) filters.fechaHasta = fechaHasta;

    onFilterChange(filters);
    if (isMobile) setIsExpanded(false);
  };

  const handleClearFilter = () => {
    setFechaDesde("");
    setFechaHasta("");
    onFilterChange({});
    if (isMobile) setIsExpanded(false);
  };

  const hasFilters = fechaDesde || fechaHasta;

  return (
    <Paper
      elevation={1}
      sx={{
        mb: 3,
        borderRadius: isMobile ? 2 : 1,
        overflow: "hidden",
      }}
    >
      {/* Filter Header - Mobile */}
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            cursor: "pointer",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FilterList color="primary" />
            <Typography variant="subtitle1">Filtros de Fecha</Typography>
            {hasFilters && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
            )}
          </Box>
          <IconButton size="small">
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      )}

      {/* Filter Content */}
      <Collapse in={!isMobile || isExpanded}>
        <Box sx={{ p: isMobile ? 2 : 3 }}>
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <FilterList color="primary" />
              <Typography variant="subtitle1">Filtrar por Fecha</Typography>
            </Box>
          )}

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            alignItems={isMobile ? "stretch" : "end"}
          >
            <TextField
              label="Fecha Desde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size={isMobile ? "medium" : "small"}
              sx={{ minWidth: isMobile ? "100%" : 200 }}
            />

            <TextField
              label="Fecha Hasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size={isMobile ? "medium" : "small"}
              sx={{ minWidth: isMobile ? "100%" : 200 }}
            />

            <Stack direction={isMobile ? "column" : "row"} spacing={1}>
              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={handleApplyFilter}
                size={isMobile ? "large" : "medium"}
                sx={{ minWidth: isMobile ? "100%" : 120 }}
              >
                Buscar
              </Button>

              <Button
                variant="outlined"
                startIcon={<Clear />}
                onClick={handleClearFilter}
                disabled={!hasFilters}
                size={isMobile ? "large" : "medium"}
                sx={{ minWidth: isMobile ? "100%" : 120 }}
              >
                Limpiar
              </Button>
            </Stack>
          </Stack>

          {hasFilters && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "primary.50", borderRadius: 1 }}>
              <Typography variant="body2" color="primary.main">
                Filtros activos:
                {fechaDesde && ` Desde: ${fechaDesde}`}
                {fechaHasta && ` Hasta: ${fechaHasta}`}
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}
