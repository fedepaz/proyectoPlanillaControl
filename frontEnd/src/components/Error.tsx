"use client";

import { Box, Button, Paper, Typography } from "@mui/material";

import Wifi from "@mui/icons-material/Wifi";
import Error from "@mui/icons-material/Error";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Refresh from "@mui/icons-material/Refresh";

import { AxiosError } from "axios";
import { getErrorTranslation } from "../hooks/errorTranslation";

interface ErrorPageProps {
  error: Error | AxiosError;
  onRetry?: () => void;
}

const ErrorPage = ({ error, onRetry }: ErrorPageProps) => {
  const isAxiosError = (error: Error | AxiosError): error is AxiosError => {
    return "response" in error && "config" in error && "isAxiosError" in error;
  };

  const getErrorMessage = (): string => {
    if (isAxiosError(error)) {
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
    if (isAxiosError(error) && error.response) {
      return error.response.status;
    }
    return null;
  };

  const errorMessage = getErrorMessage();
  const statusCode = getStatusCode();

  const translatedError = getErrorTranslation(statusCode || 500, errorMessage);

  const getErrorDetails = () => {
    const message = errorMessage.toLowerCase();

    if (statusCode) {
      if (statusCode === 401 || statusCode === 403) {
        return {
          icon: (
            <LockOutlined
              sx={{
                fontSize: 48,
                color: "error.main",
              }}
            />
          ),
          title: translatedError.title,
          description: translatedError.message,
          canRetry: translatedError.canRetry,
        };
      }

      if (statusCode >= 500) {
        return {
          icon: (
            <Error
              sx={{
                fontSize: 48,
                color: "error.main",
              }}
            />
          ),
          title: translatedError.title,
          description: translatedError.message,
          canRetry: translatedError.canRetry,
        };
      }

      if (statusCode >= 400) {
        return {
          icon: (
            <Error
              sx={{
                fontSize: 48,
                color: "error.main",
              }}
            />
          ),
          title: translatedError.title,
          description: translatedError.message,
          canRetry: translatedError.canRetry,
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
        icon: (
          <Wifi
            sx={{
              fontSize: 48,
              color: "error.main",
            }}
          />
        ),
        title: translatedError.title,
        description: translatedError.message,
        canRetry: translatedError.canRetry,
      };
    }

    if (message.includes("unauthorized") || message.includes("forbidden")) {
      return {
        icon: (
          <LockOutlined
            sx={{
              fontSize: 48,
              color: "error.main",
            }}
          />
        ),
        title: translatedError.title,
        description: translatedError.message,
        canRetry: translatedError.canRetry,
      };
    }

    if (message.includes("server error") || message.includes("internal")) {
      return {
        icon: (
          <Error
            sx={{
              fontSize: 48,
              color: "error.main",
            }}
          />
        ),
        title: translatedError.title,
        description: translatedError.message,
        canRetry: translatedError.canRetry,
      };
    }

    return {
      icon: (
        <Error
          sx={{
            fontSize: 48,
            color: "error.main",
          }}
        />
      ),
      title: translatedError.title,
      description: translatedError.message,
      canRetry: translatedError.canRetry,
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

        {onRetry && (
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={onRetry}
            sx={{ mt: 2 }}
          >
            {errorDetails.canRetry ? "Intente de Nuevo" : "Continuar"}
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default ErrorPage;
