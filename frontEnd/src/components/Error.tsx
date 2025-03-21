import { Box, Button, Typography, Paper } from "@mui/material";
//import { WifiOff, ServerCrash, Lock, RefreshCw } from "lucide-react";
import {
  Wifi,
  Error as ErrorIcon,
  LockOutlined,
  Refresh,
} from "@mui/icons-material";

interface ErrorPageProps {
  error: Error;
  onRetry?: () => void;
}

const ErrorPage = ({ error, onRetry }: ErrorPageProps) => {
  const getErrorDetails = () => {
    const message = error.message.toLowerCase();

    if (message.includes("unable to connect") || message.includes("network")) {
      return {
        //icon: <WifiOff size={48} />,
        icon: <Wifi sx={{ fontSize: 48 }} />,
        title: "Connection Error",
        description: error.message,
        canRetry: true,
      };
    }

    if (message.includes("unauthorized") || message.includes("forbidden")) {
      return {
        //icon: <Lock size={48} />,
        icon: <LockOutlined sx={{ fontSize: 48 }} />,
        title: "Authentication Error",
        description:
          "Your session has expired or you don't have permission. Please try logging in again.",
        canRetry: false,
      };
    }

    if (message.includes("server error") || message.includes("internal")) {
      return {
        //icon: <ServerCrash size={48} />,
        icon: <ErrorIcon sx={{ fontSize: 48 }} />,
        title: "Server Error",
        description:
          "We're experiencing technical difficulties. Our team has been notified.",
        canRetry: true,
      };
    }

    return {
      //icon: <ServerCrash size={48} />,
      icon: <ErrorIcon sx={{ fontSize: 48 }} />,
      title: "Unexpected Error",
      description: error.message,
      canRetry: true,
    };
  };

  const errorDetails = getErrorDetails();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: "md",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {errorDetails.icon}

        <Typography variant="h5" component="h1" gutterBottom>
          {errorDetails.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" textAlign="center">
          {errorDetails.description}
        </Typography>

        {errorDetails.canRetry && onRetry && (
          <Button
            variant="contained"
            //startIcon={<RefreshCw />}
            startIcon={<Refresh />}
            onClick={onRetry}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default ErrorPage;
