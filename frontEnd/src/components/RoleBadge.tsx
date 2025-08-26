"use client";

import { alpha, Chip, Tooltip, useTheme } from "@mui/material";

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
  [UserRole.OPER_UNIDAD]: "Operaciones de unidad",
  [UserRole.ICIA_UNIDAD]: "Información Criminal de unidad",
  [UserRole.OPER_REGIONAL]: "Operaciones de region",
  [UserRole.ICIA_REGIONAL]: "Información Criminal de región",
  [UserRole.OPER_CEAC]: "Operaciones de CEAC",
  [UserRole.ICIA_CEAC]: "Información Criminal de CEAC",
};

// Role colors for visual distinction
const roleColors: Record<UserRole, string> = {
  [UserRole.ADMIN]: "#7b1fa2", // Purple for admin
  [UserRole.AUXILIAR]: "#1976d2", // Blue for auxiliar
  [UserRole.RESPONSABLE]: "#388e3c", // Green for responsable
  [UserRole.SUPERVISOR]: "#f57c00", // Orange for supervisor
  [UserRole.OPER_UNIDAD]: "#0097a7", // Teal for oper_unidad
  [UserRole.ICIA_UNIDAD]: "#006064", // Dark blue for icia_unidad
  [UserRole.OPER_REGIONAL]: "#d32f2f", // Red for oper_regional
  [UserRole.ICIA_REGIONAL]: "#6a1b9a", // Purple for icia_regional
  [UserRole.OPER_CEAC]: "#5d4037", // Brown for oper_ceac
  [UserRole.ICIA_CEAC]: "#3e2723", // Dark brown for icia_ceac
};

export function RoleBadge({ role, size = "small" }: RoleBadgeProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const color = roleColors[role];
  const bg = alpha(color, isDarkMode ? 0.25 : 0.12);

  return (
    <Tooltip title={roleDescriptions[role]} arrow placement="top">
      <Chip
        label={formatRoleName(role)}
        size={size}
        sx={{
          backgroundColor: bg,
          color: isDarkMode ? theme.palette.getContrastText(color) : color,
          fontWeight: 600,
          borderRadius: "20px",
          height: size === "small" ? 26 : 36,
          fontSize: size === "small" ? 13 : 15,
          boxShadow: `0 1px 4px ${alpha(color, 0.18)}`,
          border: `1px solid ${alpha(color, 0.32)}`,
          "& .MuiChip-label": {
            px: size === "small" ? 1.2 : 2,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          },
        }}
      />
    </Tooltip>
  );
}
