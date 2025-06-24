import { Stack, Chip } from "@mui/material";
import { BasePersonalOption } from "../types/option";
import { hasPermission, RolePermissions } from "../actions/types";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

interface PersonalStatusChipsProps {
  personal: BasePersonalOption;
  direction?: "row" | "column";
  size?: "small" | "medium";
}

export function PersonalStatusChips({
  personal,
  direction = "row",
  size = "small",
}: PersonalStatusChipsProps) {
  const { user } = useAuth();
  const [canViewUserCreated, setCanViewUserCreated] = useState(false);
  const [canViewValidationStatus, setCanViewValidationStatus] = useState(false);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (user) {
      setCanViewUserCreated(hasPermission(user, RolePermissions.ALL));
      setCanViewValidationStatus(hasPermission(user, RolePermissions.ALL));
      if (hasPermission(user, RolePermissions.ALL)) {
        setIsValid(!personal.isUserCreated && !personal.needsValidation);
      }
    }
  }, [
    user,
    setCanViewUserCreated,
    setCanViewValidationStatus,
    setIsValid,
    personal,
  ]);

  return (
    <Stack direction={direction} spacing={0.5} flexWrap="wrap">
      {canViewUserCreated && personal.isUserCreated && (
        <Chip label="Usuario" size={size} color="warning" variant="outlined" />
      )}
      {canViewValidationStatus && personal.needsValidation && (
        <Chip label="Validacion" size={size} color="error" variant="outlined" />
      )}
      {isValid && (
        <Chip label="Validado" size={size} color="success" variant="outlined" />
      )}
    </Stack>
  );
}
