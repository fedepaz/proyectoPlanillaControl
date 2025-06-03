import React, { ReactNode, useState } from "react";
import { ErrorContextType, ErrorContext } from "../contexts/ErrorContext";

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);
  const clearError = () => setError(null);

  const value: ErrorContextType = {
    error,
    setError,
    clearError,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
