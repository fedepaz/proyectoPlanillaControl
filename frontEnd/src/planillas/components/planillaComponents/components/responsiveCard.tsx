import type React from "react";

import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

interface ResponsiveCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isMobile: boolean;
}

export function ResponsiveCard({
  title,
  icon,
  children,
  isMobile,
}: ResponsiveCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: isMobile ? 2 : 0,
        borderRadius: isMobile ? 2 : 1,
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {icon}
            <Typography variant={isMobile ? "h6" : "subtitle1"} component="div">
              {title}
            </Typography>
          </Box>
        }
        sx={{
          pb: 1,
          px: isMobile ? 2 : 3,
          pt: isMobile ? 2 : 3,
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          px: isMobile ? 2 : 3,
          pb: isMobile ? 2 : 3,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}
