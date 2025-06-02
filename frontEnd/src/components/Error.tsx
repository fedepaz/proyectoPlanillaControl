import { Box, Button, Typography, Paper } from "@mui/material";
import {
  Wifi,
  Error as ErrorIcon,
  LockOutlined,
  Refresh,
} from "@mui/icons-material";
import { AxiosError } from "axios";

interface ErrorPageProps {
  error: Error | AxiosError;
  onRetry?: () => void;
}

const ErrorPage = ({ error, onRetry }: ErrorPageProps) => {
  const siAxiosError = (error: Error | AxiosError): error is AxiosError => {
    return "response" in error && "config" in error && "isAxiosError" in error;
  };

  const getErrorMessage = (): string => {
    if (siAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData && typeof responseData === "object") {
        if (
          "message" in responseData &&
          typeof responseData.message === "string"
        ) {
          return responseData.message;
        }
        if ("error" in responseData && typeof responseData.error === "string") {
          return responseData.error;
        }
        if (
          "detail" in responseData &&
          typeof responseData.detail === "string"
        ) {
          return responseData.detail;
        }
        if (typeof responseData === "string") {
          return responseData;
        }
      }
      if (error.response?.statusText) {
        return error.response.statusText;
      }
    }
    return error.message;
  };

  const getStatusCode = (): number | null => {
    if (siAxiosError(error) && error.response) {
      return error.response.status;
    }
    return null;
  };

  const errorMessage = getErrorMessage();
  const statusCode = getStatusCode();

  const getErrorDetails = () => {
    const message = errorMessage.toLowerCase();

    if (statusCode) {
      if (statusCode === 401 || statusCode === 403) {
        return {
          icon: <LockOutlined sx={{ fontSize: 48 }} />,
          title: "Authentication Error",
          description:
            "Your session has expired or you don't have permission. Please try logging in again.",
          canRetry: false,
        };
      }

      if (statusCode >= 500) {
        return {
          icon: <ErrorIcon sx={{ fontSize: 48 }} />,
          title: "Server Error",
          description:
            "We're experiencing technical difficulties. Our team has been notified.",
          canRetry: true,
        };
      }

      if (statusCode >= 400) {
        return {
          icon: <ErrorIcon sx={{ fontSize: 48 }} />,
          title: "Request Error",
          description: errorMessage,
          canRetry: false,
        };
      }
    }

    // Fallback to message-based detection
    if (
      message.includes("unable to connect") ||
      message.includes("network") ||
      message.includes("connection") ||
      message.includes("timeout")
    ) {
      return {
        icon: <Wifi sx={{ fontSize: 48 }} />,
        title: "Connection Error",
        description: errorMessage,
        canRetry: true,
      };
    }

    if (message.includes("unauthorized") || message.includes("forbidden")) {
      return {
        icon: <LockOutlined sx={{ fontSize: 48 }} />,
        title: "Authentication Error",
        description:
          "Your session has expired or you don't have permission. Please try logging in again.",
        canRetry: false,
      };
    }

    if (message.includes("server error") || message.includes("internal")) {
      return {
        icon: <ErrorIcon sx={{ fontSize: 48 }} />,
        title: "Server Error",
        description:
          "We're experiencing technical difficulties. Our team has been notified.",
        canRetry: true,
      };
    }

    return {
      icon: <ErrorIcon sx={{ fontSize: 48 }} />,
      title: "Unexpected Error",
      description: errorMessage,
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
