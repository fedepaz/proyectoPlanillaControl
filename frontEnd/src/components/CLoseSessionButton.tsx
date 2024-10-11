import { Button, Typography } from "@mui/material";
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
    <Button color="inherit" onClick={onLogoutButton} startIcon={<LogoutIcon />}>
      <Typography variant="caption" color="inherit">
        Cerrar Sesión
      </Typography>
    </Button>
  );
}
