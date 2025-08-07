import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import InfoIcon from "@mui/icons-material/InfoOutlined";

interface HelperTextWarningProps {
  isUserCreated: boolean;
  itemType?: string;
}

export function HelperTextWarning({
  isUserCreated,
  itemType,
}: HelperTextWarningProps) {
  if (!isUserCreated) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
      <InfoIcon sx={{ fontSize: 14, color: "warning.main" }} />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: "0.7rem", lineHeight: 1.2 }}
      >
        {itemType} agregado por usuario - no verificado
      </Typography>
    </Box>
  );
}
