import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";

export function useAppError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useAppError must be used within a ErrorProvider");
  }
  return context;
}
