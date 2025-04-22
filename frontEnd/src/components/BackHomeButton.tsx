"use client";
import { IconButton, Tooltip, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

interface BackHomeButtonProps {
  onComeBackHome: (data: boolean) => void;
}

export default function BackHomeButton({
  onComeBackHome,
}: BackHomeButtonProps) {
  const onComeBackHomeButton = () => {
    onComeBackHome(true);
  };

  return (
    <Tooltip title="Regresar a la página de inicio" arrow placement="bottom">
      <IconButton
        color="inherit"
        onClick={onComeBackHomeButton}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px 8px",
          borderRadius: 1,
          minWidth: "auto",
        }}
      >
        <HomeIcon
          sx={{
            fontSize: "1.1rem",
          }}
        />
        <Typography
          variant="caption"
          component="span"
          sx={{
            fontSize: "0.65rem",
            lineHeight: 1,
            mt: 0.5,
          }}
        >
          Regresar{" "}
        </Typography>{" "}
      </IconButton>
    </Tooltip>
  );
}
