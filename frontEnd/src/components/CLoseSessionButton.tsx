import { IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

interface CloseSessionButtonProps {
  onLogout: (data: boolean) => void;
}

export default function CloseSessionButton({
  onLogout,
}: CloseSessionButtonProps) {
  const [showLogoutPage, setShowLogoutPage] = useState(false);

  const onLogoutButton = () => {
    setShowLogoutPage(true);
    onLogout(showLogoutPage);
  };

  return (
    <IconButton
      color="inherit"
      onClick={onLogoutButton}
      sx={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <LogoutIcon />

      <Typography variant="caption" component="span">
        Cerrar Sesion
      </Typography>
    </IconButton>
  );
}
