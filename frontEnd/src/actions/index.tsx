"use client";
import { useMemo } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd"; // Better for generating documents
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // More personal profile icon
import TuneIcon from "@mui/icons-material/Tune"; // Better for settings/configuration
import GroupIcon from "@mui/icons-material/Group"; // Better for user management
import SecurityIcon from "@mui/icons-material/Security"; // Better for roles/permissions
import AnalyticsIcon from "@mui/icons-material/Analytics"; // Better for reports/analytics
import FolderSharedIcon from "@mui/icons-material/FolderShared"; // For shared history
import AssignmentIcon from "@mui/icons-material/Assignment"; // For specific role histories
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {
  type ActionButton,
  ActionCategory,
  getEffectiveRoles,
  hasPermission,
  User,
  UserRole,
} from "./types";
import { View } from "../views";

export const createDashboardActions = (callbacks: {
  onGeneratePlanillas?: () => void;
  onHistorialSupervisores?: () => void;
  onHistorialResponsables?: () => void;
  onHistorialAuxiliares?: () => void;
  onUserRoles?: () => void;
  onReports?: () => void;
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
      icon: <PostAddIcon />,
      onClick: createNavigationHandler(
        View.GENERATE_PLANILLAS,
        callbacks.onGeneratePlanillas
      ),
      primary: true,
      category: ActionCategory.MAIN,
      allowedRoles: [
        UserRole.AUXILIAR,
        UserRole.RESPONSABLE,
        UserRole.SUPERVISOR,
        UserRole.ADMIN,
      ],
      description: "Generar planillas para la gestión de equipajes y servicios",
    },
    {
      id: "view_history",
      label: "Historial de Planillas",
      icon: <FolderSharedIcon />, // Better represents shared document history
      onClick: createNavigationHandler(
        View.VIEW_HISTORY,
        callbacks.onViewHistory
      ),
      category: ActionCategory.MAIN,
      allowedRoles: [
        UserRole.AUXILIAR,
        UserRole.RESPONSABLE,
        UserRole.SUPERVISOR,
        UserRole.ADMIN,
        UserRole.OPER_UNIDAD,
        UserRole.OPER_REGIONAL,
        UserRole.OPER_CEAC,
      ],
      description: "Ver historial de planillas",
    },
    {
      id: "reports",
      label: "Reportes",
      icon: <AnalyticsIcon />,
      onClick: createNavigationHandler(View.REPORTS, callbacks.onReports),
      category: ActionCategory.REPORTS,
      allowedRoles: [
        UserRole.RESPONSABLE,
        UserRole.SUPERVISOR,
        UserRole.OPER_UNIDAD,
        UserRole.OPER_REGIONAL,
        UserRole.OPER_CEAC,
        UserRole.ADMIN,
      ],
      description: "Generar reportes estadísticos y métricas",
    },
    {
      id: "view_profile",
      label: "Perfil",
      icon: <AccountCircleIcon />,
      onClick: createNavigationHandler(
        View.VIEW_PROFILE,
        callbacks.onViewProfile
      ),
      category: ActionCategory.ACCOUNT,
      allowedRoles: Object.values(UserRole),
      description: "Gestionar perfil de usuario",
    },
    {
      id: "open_settings",
      label: "Configuración",
      icon: <TuneIcon />,
      onClick: createNavigationHandler(View.SETTINGS, callbacks.onOpenSettings),
      category: ActionCategory.SETTINGS,
      allowedRoles: [
        UserRole.SUPERVISOR,
        UserRole.ADMIN,
        UserRole.OPER_UNIDAD,
        UserRole.OPER_REGIONAL,
        UserRole.OPER_CEAC,
      ],
      description: "Gestionar opciones del sistema",
    },
    {
      id: "user_roles",
      label: "Roles de Usuario",
      icon: <SecurityIcon />,
      onClick: createNavigationHandler(View.USER_ROLES, callbacks.onUserRoles),
      category: ActionCategory.ADMIN,
      allowedRoles: [UserRole.ADMIN],
      description: "Configurar roles y permisos personalizados",
    },
    {
      id: "manage_users",
      label: "Administrar Usuarios",
      icon: <GroupIcon />,
      onClick: createNavigationHandler(
        View.MANAGE_USERS,
        callbacks.onManageUsers
      ),
      category: ActionCategory.ADMIN,
      allowedRoles: [
        UserRole.OPER_UNIDAD,
        UserRole.OPER_REGIONAL,
        UserRole.OPER_CEAC,
        UserRole.ADMIN,
      ],
      description: "Crear y gestionar usuarios del sistema",
    },
    {
      id: "historial_auxiliares",
      label: "Historial de Planillas de Auxiliares",
      icon: <AssignmentIcon />,
      onClick: createNavigationHandler(
        View.VIEW_HISTORY_AUXILIARES,
        callbacks.onHistorialAuxiliares
      ),
      category: ActionCategory.REPORTS,
      allowedRoles: [UserRole.RESPONSABLE, UserRole.SUPERVISOR, UserRole.ADMIN],
      description: "Ver historial de planillas de auxiliares",
    },
    {
      id: "historial_responsables",
      label: "Historial de Planillas de Responsables",
      icon: <SupervisedUserCircleIcon />,
      onClick: createNavigationHandler(
        View.VIEW_HISTORY_RESPONSABLES,
        callbacks.onHistorialResponsables
      ),
      category: ActionCategory.REPORTS,
      allowedRoles: [UserRole.SUPERVISOR, UserRole.ADMIN],
      description: "Ver historial de planillas de responsables",
    },
    {
      id: "historial_supervisors",
      label: "Historial de Planillas de Supervisores",
      icon: <HistoryIcon />,
      onClick: createNavigationHandler(
        View.VIEW_HISTORY_SUPERVISORES,
        callbacks.onHistorialSupervisores
      ),
      category: ActionCategory.REPORTS,
      allowedRoles: [UserRole.SUPERVISOR, UserRole.ADMIN],
      description: "Ver historial de planillas de supervisores",
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

export const filterActionsByUserAndCategory = (
  actions: ActionButton[],
  user: User,
  category: ActionCategory
): ActionButton[] => {
  return actions.filter(
    (action) =>
      action.category === category && hasPermission(user, action.allowedRoles)
  );
};

export function useDashboardActions(
  callbacks: {
    onGeneratePlanillas?: () => void;
    onHistorialSupervisores?: () => void;
    onHistorialResponsables?: () => void;
    onHistorialAuxiliares?: () => void;
    onUserRoles?: () => void;
    onReports?: () => void;
    onViewHistory?: () => void;
    onViewProfile?: () => void;
    onOpenSettings?: () => void;
    onManageUsers?: () => void;
    onNavigate?: (view: View) => void;
  },
  user: User
) {
  const allActions = useMemo(
    () => createDashboardActions(callbacks),
    [callbacks]
  );

  const effectiveRoles = useMemo(() => getEffectiveRoles(user), [user]);

  const mainActions = useMemo(
    () => filterActionsByUserAndCategory(allActions, user, ActionCategory.MAIN),
    [allActions, user]
  );

  const accountActions = useMemo(
    () =>
      filterActionsByUserAndCategory(allActions, user, ActionCategory.ACCOUNT),
    [allActions, user]
  );

  const settingsActions = useMemo(
    () =>
      filterActionsByUserAndCategory(allActions, user, ActionCategory.SETTINGS),
    [allActions, user]
  );

  const reportsActions = useMemo(
    () =>
      filterActionsByUserAndCategory(allActions, user, ActionCategory.REPORTS),
    [allActions, user]
  );

  const adminActions = useMemo(
    () =>
      filterActionsByUserAndCategory(allActions, user, ActionCategory.ADMIN),
    [allActions, user]
  );

  const canAccessAdmin = useMemo(
    () => hasPermission(user, [UserRole.ADMIN]) || adminActions.length > 0,
    [user, adminActions]
  );

  return {
    mainActions,
    accountActions,
    settingsActions,
    reportsActions,
    adminActions,
    effectiveRoles,
    canAccessAdmin,
  };
}

// Helper function to show what features user will have access to
/**
 * 
export function getUpcomingFeatures(user: User): {
  currentAccess: string[];
  futureAccess: string[];
  hierarchyBonus: string[];
} {
  const effectiveRoles = getEffectiveRoles(user);
  const allActions = createDashboardActions({}); // Empty callbacks for analysis

  const accessibleActions = allActions.filter((action) =>
    hasPermission(user, action.allowedRoles)
  );

  const inaccessibleActions = allActions.filter(
    (action) => !hasPermission(user, action.allowedRoles)
  );

  // Features they get because of hierarchy (not just base role)
  const hierarchyBonusActions = allActions.filter((action) => {
    const hasRoleAccess = action.allowedRoles.includes(user.role);
    const hasHierarchyAccess = hasPermission(user, action.allowedRoles);
    return !hasRoleAccess && hasHierarchyAccess;
  });

  return {
    currentAccess: accessibleActions.map((a) => a.label),
    futureAccess: inaccessibleActions.map((a) => a.label),
    hierarchyBonus: hierarchyBonusActions.map((a) => a.label),
  };
}
*/
