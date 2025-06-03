import { ReactNode } from "react";
import { useAppError } from "../../../../hooks/useAppError";
import ErrorPage from "../../../../components/Error";

interface StepErrorWrapperProps {
  children: ReactNode;
}

export function StepErrorWrapper({ children }: StepErrorWrapperProps) {
  const { error: appError, clearError } = useAppError();

  if (appError) {
    return (
      <ErrorPage
        error={appError}
        onRetry={() => {
          clearError();
        }}
      />
    );
  }

  return <>{children}</>;
}
