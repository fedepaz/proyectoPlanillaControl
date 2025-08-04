import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  Alert,
  useTheme,
  Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLogout } from "../services/logout";

interface LogoutPageProps {
  darkMode?: boolean;
  onBackHome?: () => void;
}

function LogoutPage({ darkMode = false, onBackHome }: LogoutPageProps) {
  useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  const onSubmit = () => {
    setIsLoggingOut(true);
    logout();
  };

  const handleCancel = () => {
    if (onBackHome) {
      onBackHome();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: { xs: 4, sm: 8 },
          p: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: darkMode ? "error.main" : "warning.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <LogoutIcon
              sx={{
                color: "white",
              }}
            />
          </Box>
          <Typography component="h1" variant="h5" fontWeight={500}>
            Cerrar sesión
          </Typography>
        </Box>

        <Alert
          severity="warning"
          sx={{
            width: "100%",
            mt: 2,
            "& .MuiAlert-message": { width: "100%" },
          }}
        >
          <Typography variant="body2">
            Estás seguro de que deseas cerrar sesión?
          </Typography>
        </Alert>

        <Divider sx={{ width: "100%", mb: 3 }} />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color={darkMode ? "error" : "warning"}
            disabled={isPending}
            onClick={onSubmit}
            startIcon={<LogoutIcon />}
            sx={{
              py: 1.5,
              position: "relative",
              color: "white",
            }}
          >
            {isPending ? (
              <CircularProgress
                size={24}
                color="inherit"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            ) : (
              "Cerrar sesión"
            )}
          </Button>

          {onBackHome && !isLoggingOut && (
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              startIcon={<ArrowBackIcon />}
              sx={{ py: 1 }}
            >
              Cancelar
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default LogoutPage;
