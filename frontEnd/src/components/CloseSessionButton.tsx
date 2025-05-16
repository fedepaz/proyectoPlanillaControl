"use client";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface CloseSessionButtonProps {
  onLogout: (data: boolean) => void;
}

export default function CloseSessionButton({
  onLogout,
}: CloseSessionButtonProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onLogoutButton = () => {
    onLogout(true);
  };

  if (!isMobile) {
    return (
      <Button
        color="inherit"
        onClick={onLogoutButton}
        startIcon={<LogoutIcon fontSize="small" />}
        size="small"
        sx={{
          borderRadius: 1,
        }}
      >
        Cerrar Sesion
      </Button>
    );
  }

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
          minWidth: "48px",
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
