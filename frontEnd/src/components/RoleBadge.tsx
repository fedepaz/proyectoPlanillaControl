"use client";

import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import useTheme from "@mui/material/styles/useTheme";

import { UserRole } from "../actions/types";
import { formatRoleName } from "../utils/formatUtils";

interface RoleBadgeProps {
  role: UserRole;
  size?: "small" | "medium";
}

// Role descriptions for tooltips
const roleDescriptions: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Acceso completo al sistema",
  [UserRole.AUXILIAR]: "Acceso a funciones básicas",
  [UserRole.RESPONSABLE]: "Responsable de área",
  [UserRole.SUPERVISOR]: "Supervisa operaciones",
  [UserRole.OPER_UNIDAD]: "Operador de unidad",
  [UserRole.OPER_REGIONAL]: "Operador regional",
  [UserRole.OPER_CEAC]: "Operador CEAC",
};

// Role colors for visual distinction
const roleColors: Record<UserRole, string> = {
  [UserRole.ADMIN]: "#7b1fa2", // Purple for admin
  [UserRole.AUXILIAR]: "#1976d2", // Blue for auxiliar
  [UserRole.RESPONSABLE]: "#388e3c", // Green for responsable
  [UserRole.SUPERVISOR]: "#f57c00", // Orange for supervisor
  [UserRole.OPER_UNIDAD]: "#0097a7", // Teal for oper_unidad
  [UserRole.OPER_REGIONAL]: "#d32f2f", // Red for oper_regional
  [UserRole.OPER_CEAC]: "#5d4037", // Brown for oper_ceac
};

export function RoleBadge({ role, size = "small" }: RoleBadgeProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Tooltip title={roleDescriptions[role]} arrow placement="top">
      <Chip
        label={formatRoleName(role)}
        size={size}
        sx={{
          backgroundColor: isDarkMode
            ? `${roleColors[role]}80`
            : `${roleColors[role]}20`,
          color: isDarkMode
            ? theme.palette.getContrastText(roleColors[role])
            : roleColors[role],
          fontWeight: 500,
          borderRadius: "16px",
          height: size === "small" ? "24px" : "32px",
          "& .MuiChip-label": {
            px: size === "small" ? 1 : 1.5,
          },
        }}
      />
    </Tooltip>
  );
}
