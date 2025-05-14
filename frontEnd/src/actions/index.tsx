"use client";
import { useMemo } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { type ActionButton, ActionCategory, UserRole } from "./types";
import { View } from "../views";

export const createDashboardActions = (callbacks: {
  onGeneratePlanillas?: () => void;
  onViewHistory?: () => void;
  onViewProfile?: () => void;
  onOpenSettings?: () => void;
  onManageUsers?: () => void;
  onNavigate?: (view: View) => void;
}): ActionButton[] => {
  const createNavigationHandler = (view: View, fallbackFn?: () => void) => {
    return () => {
      if (callbacks.onNavigate) {
        callbacks.onNavigate(view);
      } else if (fallbackFn) {
        fallbackFn();
      }
    };
  };

  return [
    {
      id: "generate_planillas",
      label: "Generar planillas",
      icon: <NoteAddIcon />,
      onClick: createNavigationHandler(
        View.GENERATE_PLANILLAS,
        callbacks.onGeneratePlanillas
      ),
      primary: true,
      category: ActionCategory.MAIN,
      allowedRoles: [UserRole.AUXILIAR, UserRole.ADMIN],
    },
    {
      id: "view_history",
      label: "Historial de Planillas",
      icon: <HistoryIcon />,
      onClick: createNavigationHandler(
        View.VIEW_HISTORY,
        callbacks.onViewHistory
      ),
      category: ActionCategory.MAIN,
      allowedRoles: [UserRole.AUXILIAR, UserRole.ADMIN],
    },
    {
      id: "view_profile",
      label: "Perfil",
      icon: <PersonIcon />,
      onClick: createNavigationHandler(
        View.VIEW_PROFILE,
        callbacks.onViewProfile
      ),
      category: ActionCategory.ACCOUNT,
      allowedRoles: [UserRole.AUXILIAR, UserRole.ADMIN],
    },
    {
      id: "open_settings",
      label: "Configuración",
      icon: <SettingsIcon />,
      onClick: createNavigationHandler(View.SETTINGS, callbacks.onOpenSettings),
      category: ActionCategory.ACCOUNT,
      allowedRoles: [UserRole.AUXILIAR, UserRole.ADMIN],
    },
    {
      id: "manage_users",
      label: "Administrar Usuarios",
      icon: <SupervisorAccountIcon />,
      onClick: createNavigationHandler(
        View.MANAGE_USERS,
        callbacks.onManageUsers
      ),
      category: ActionCategory.ADMIN,
      allowedRoles: [UserRole.ADMIN],
    },
  ];
};

export const filterActionsByRoleAndCategory = (
  actions: ActionButton[],
  role: UserRole,
  category: ActionCategory
): ActionButton[] => {
  return actions.filter(
    (action) =>
      action.category === category && action.allowedRoles?.includes(role)
  );
};

export function useDashboardActions(
  callbacks: {
    onGeneratePlanillas?: () => void;
    onViewHistory?: () => void;
    onViewProfile?: () => void;
    onOpenSettings?: () => void;
    onManageUsers?: () => void;
    onNavigate?: (view: View) => void;
  },
  userRole: UserRole
) {
  const allActions = useMemo(
    () => createDashboardActions(callbacks),
    [callbacks]
  );
  const mainActions = useMemo(
    () =>
      filterActionsByRoleAndCategory(allActions, userRole, ActionCategory.MAIN),
    [allActions, userRole]
  );
  const accountActions = useMemo(
    () =>
      filterActionsByRoleAndCategory(
        allActions,
        userRole,
        ActionCategory.ACCOUNT
      ),
    [allActions, userRole]
  );
  const adminActions = useMemo(
    () =>
      filterActionsByRoleAndCategory(
        allActions,
        userRole,
        ActionCategory.ADMIN
      ),
    [allActions, userRole]
  );

  return {
    mainActions,
    accountActions,
    adminActions,
  };
}
