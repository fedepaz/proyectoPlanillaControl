import { Stack, Chip } from "@mui/material";
import { BasePersonalOption } from "../types/option";
import { UserRole } from "../actions/types";
import { hasPermission, RolePermissions } from "../actions/types";

interface PersonalStatusChipsProps {
  personal: BasePersonalOption;
  userRole?: UserRole;
  direction?: "row" | "column";
  size?: "small" | "medium";
}

export function PersonalStatusChips({
  personal,
  userRole = UserRole.AUXILIAR,
  direction = "row",
  size = "small",
}: PersonalStatusChipsProps) {
  const canViewUserCreated = hasPermission(userRole, RolePermissions.ALL);

  const canViewValidationStatus = hasPermission(userRole, RolePermissions.ALL);

  const showActiveStatus = !personal.isUserCreated && !personal.needsValidation;

  return (
    <Stack direction={direction} spacing={0.5} flexWrap="wrap">
      {canViewUserCreated && personal.isUserCreated && (
        <Chip label="Usuario" size={size} color="warning" variant="outlined" />
      )}
      {canViewValidationStatus && personal.needsValidation && (
        <Chip label="Validacion" size={size} color="error" variant="outlined" />
      )}
      {showActiveStatus && (
        <Chip label="Activo" size={size} color="success" variant="outlined" />
      )}
    </Stack>
  );
}
