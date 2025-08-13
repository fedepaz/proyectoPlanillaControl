import type React from "react";

import { Box, Grid, Typography } from "@mui/material";

interface FieldDisplayProps {
  label: string;
  value: string | React.ReactNode;
  fullWidth?: boolean;
  isMobile: boolean;
}

export function FieldDisplay({
  label,
  value,
  fullWidth = false,
  isMobile,
}: FieldDisplayProps) {
  return (
    <Grid item xs={12} sm={fullWidth ? 12 : 6}>
      <Box sx={{ mb: isMobile ? 1 : 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500, mb: 0.5 }}
        >
          {label}:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ wordBreak: "break-word" }}
        >
          {value}
        </Typography>
      </Box>
    </Grid>
  );
}
