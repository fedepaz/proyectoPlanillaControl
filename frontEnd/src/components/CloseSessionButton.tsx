"use client";
import { IconButton, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface CloseSessionButtonProps {
  onLogout: (data: boolean) => void;
}

export default function CloseSessionButton({
  onLogout,
}: CloseSessionButtonProps) {
  const onLogoutButton = () => {
    onLogout(true);
  };

  return (
    <Tooltip title="Cerrar sesión" arrow placement="bottom">
      <IconButton
        color="inherit"
        onClick={onLogoutButton}
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
        <LogoutIcon
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
          Cerrar Sesion
        </Typography>
      </IconButton>
    </Tooltip>
  );
}
