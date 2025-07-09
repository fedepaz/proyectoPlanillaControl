"use client";
import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  isMobile: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  isMobile,
}: PaginationControlsProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  if (isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Página {currentPage} de {totalPages} - {totalCount} registros
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            onClick={handleFirst}
            disabled={currentPage === 1}
            size="small"
          >
            <FirstPage />
          </IconButton>
          <IconButton
            onClick={handlePrevious}
            disabled={currentPage === 1}
            size="small"
          >
            <ChevronLeft />
          </IconButton>
          <Typography
            variant="body2"
            sx={{ minWidth: 60, textAlign: "center" }}
          >
            {currentPage}
          </Typography>
          <IconButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
            size="small"
          >
            <ChevronRight />
          </IconButton>
          <IconButton
            onClick={handleLast}
            disabled={currentPage === totalPages}
            size="small"
          >
            <LastPage />
          </IconButton>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Mostrando {totalCount} registros • Página {currentPage} de {totalPages}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          onClick={handleFirst}
          disabled={currentPage === 1}
          size="small"
          startIcon={<FirstPage />}
        >
          Primera
        </Button>
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          size="small"
          startIcon={<ChevronLeft />}
        >
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          size="small"
          endIcon={<ChevronRight />}
        >
          Siguiente
        </Button>
        <Button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          size="small"
          endIcon={<LastPage />}
        >
          Última
        </Button>
      </Stack>
    </Box>
  );
}
