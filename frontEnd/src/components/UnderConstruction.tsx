"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { memo } from "react";

interface UnderConstructionProps {
  featureName: string;
  description?: string;
  estimatedTime?: string;
  onBack: () => void;
}

export const UnderConstruction = memo(function UnderConstruction({
  featureName,
  description = "Estamos trabjando para implementar esta funcionalidad en breve. Gracias por su paciencia.",
  estimatedTime,
  onBack,
}: UnderConstructionProps) {
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ConstructionIcon sx={{ fontSize: "4rem", mb: 2 }} />

        <Typography variant="h5" component="h1" gutterBottom fontWeight={500}>
          {featureName}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            my: 2,
            borderRadius: "2px",
          }}
        />
        <Typography variant="body1" sx={{ mb: 2 }}>
          {description}
        </Typography>

        {estimatedTime && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Disponible a partir de {estimatedTime}
          </Typography>
        )}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
          onClick={onBack}
        >
          Volver
        </Button>
      </Paper>
    </Container>
  );
});
