import { LoginPage } from "../login/components/LoginPage";
import { RegisterPage } from "../login/components/RegisterPage";
import { LogoutPage } from "../login/components/LogoutPage";
import { Dashboard } from "../login/components/Dashboard";
import { PlanillasProvider } from "../planillas/components/PlanillasProvider";
import { ResetPasswordPage } from "../login/components/ResetPassword";
import type React from "react";
import { UnderConstruction } from "../components/UnderConstruction";

export enum View {
  LOGIN = "login",
  REGISTER = "register",
  RESET_PASSWORD = "reset_password",
  DASHBOARD = "dashboard",
  LOGOUT = "logout",
  GENERATE_PLANILLAS = "generate_planillas",
  VIEW_HISTORY = "view_history",
  VIEW_PROFILE = "view_profile",
  SETTINGS = "settings",
  MANAGE_USERS = "manage_users",
  REPORTS = "reports",
  USER_ROLES = "user_roles",
  VIEW_HISTORY_RESPONSABLES = "view_history_responsables",
  VIEW_HISTORY_SUPERVISORES = "view_history_supervisors",
  VIEW_HISTORY_AUXILIARES = "view_history_auxiliares",
}

export interface ViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin?: (data: any) => void;
  onRegister?: (data: boolean) => void;
  onResetPassword?: (data: boolean) => void;
  onGeneratePlanillas?: () => void;
  onBackHome?: () => void;
}

// Feature descriptions for better user communication
export const featureDescriptions: Record<
  View,
  {
    name: string;
    description: string;
    estimatedTime?: string;
    status: "active" | "under_construction";
  }
> = {
  [View.LOGIN]: {
    name: "Iniciar Sesión",
    description: "Accede a tu cuenta del sistema de gestión de planillas",
    status: "active",
  },
  [View.REGISTER]: {
    name: "Registrarse",
    description: "Crea una nueva cuenta para acceder al sistema",
    status: "active",
  },
  [View.RESET_PASSWORD]: {
    name: "Restablecer Contraseña",
    description: "Recupera el acceso a tu cuenta mediante correo electrónico",
    status: "active",
  },
  [View.DASHBOARD]: {
    name: "Panel Principal",
    description:
      "Centro de control con acceso a todas las funcionalidades del sistema",
    status: "active",
  },
  [View.LOGOUT]: {
    name: "Cerrar Sesión",
    description: "Cierra tu sesión actual de forma segura",
    status: "active",
  },
  [View.GENERATE_PLANILLAS]: {
    name: "Generar Planillas",
    description:
      "Crea y gestiona planillas para el control de equipajes y servicios según tu rol",
    status: "active",
  },
  [View.VIEW_HISTORY]: {
    name: "Historial de Planillas",
    description:
      "Consulta, filtra y exporta el historial completo de planillas generadas. Incluye búsqueda avanzada por fechas, usuarios y estados.",
    estimatedTime: "Julio 2025",
    status: "under_construction",
  },
  [View.VIEW_PROFILE]: {
    name: "Perfil de Usuario",
    description:
      "Gestiona tu información personal, cambia contraseña, configura notificaciones y personaliza tu experiencia en el sistema.",
    estimatedTime: "Agosto 2025",
    status: "under_construction",
  },
  [View.SETTINGS]: {
    name: "Configuración del Sistema",
    description:
      "Ajusta parámetros del sistema, configura integraciones, gestiona backups automáticos y personaliza la interfaz según las necesidades de tu organización.",
    estimatedTime: "Septiembre 2025",
    status: "under_construction",
  },
  [View.MANAGE_USERS]: {
    name: "Administración de Usuarios",
    description:
      "Crea, edita y gestiona usuarios del sistema. Asigna roles, controla accesos, gestiona grupos de trabajo y monitorea la actividad de usuarios.",
    estimatedTime: "Octubre 2025",
    status: "under_construction",
  },
  [View.REPORTS]: {
    name: "Reportes y Análisis",
    description:
      "Genera reportes detallados, estadísticas de rendimiento, análisis de tendencias y métricas operativas. Incluye exportación a Excel, PDF y dashboards interactivos.",
    estimatedTime: "Noviembre 2025",
    status: "under_construction",
  },
  [View.USER_ROLES]: {
    name: "Gestión de Roles y Permisos",
    description:
      "Define roles personalizados, configura permisos granulares, gestiona jerarquías de acceso y controla las capacidades de cada tipo de usuario en el sistema.",
    estimatedTime: "Diciembre 2025",
    status: "under_construction",
  },
  [View.VIEW_HISTORY_RESPONSABLES]: {
    name: "Historial de Responsables",
    description:
      "Accede al historial específico de planillas generadas por usuarios con rol de Responsable. Incluye métricas de desempeño y análisis de productividad.",
    estimatedTime: "Diciembre 2025",
    status: "under_construction",
  },
  [View.VIEW_HISTORY_SUPERVISORES]: {
    name: "Historial de Supervisores",
    description:
      "Consulta el historial de planillas de Supervisores con herramientas avanzadas de supervisión, validación de procesos y control de calidad.",
    estimatedTime: "Diciembre 2025",
    status: "under_construction",
  },
  [View.VIEW_HISTORY_AUXILIARES]: {
    name: "Historial de Auxiliares",
    description:
      "Revisa el historial de planillas de Auxiliares con seguimiento detallado de tareas, tiempos de ejecución y evaluación de rendimiento.",
    estimatedTime: "Diciembre 2025",
    status: "under_construction",
  },
};

const createUnderConstructionView = (view: View) => {
  return function UnderConstructionView({ onBackHome }: ViewProps) {
    const feature = featureDescriptions[view];
    return (
      <UnderConstruction
        featureName={feature.name}
        description={feature.description}
        estimatedTime={feature.estimatedTime}
        onBack={() => onBackHome && onBackHome()}
      />
    );
  };
};

// Helper function to get feature info
export const getFeatureInfo = (view: View) => {
  return featureDescriptions[view];
};

// Helper function to check if feature is under construction
export const isUnderConstruction = (view: View): boolean => {
  return featureDescriptions[view].status === "under_construction";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewComponents: Record<View, React.ComponentType<any>> = {
  [View.LOGIN]: LoginPage,
  [View.REGISTER]: RegisterPage,
  [View.RESET_PASSWORD]: ResetPasswordPage,
  [View.DASHBOARD]: Dashboard,
  [View.LOGOUT]: LogoutPage,
  [View.GENERATE_PLANILLAS]: PlanillasProvider,
  [View.VIEW_HISTORY]: createUnderConstructionView(View.VIEW_HISTORY),
  [View.VIEW_PROFILE]: createUnderConstructionView(View.VIEW_PROFILE),
  [View.SETTINGS]: createUnderConstructionView(View.SETTINGS),
  [View.MANAGE_USERS]: createUnderConstructionView(View.MANAGE_USERS),
  [View.REPORTS]: createUnderConstructionView(View.REPORTS),
  [View.USER_ROLES]: createUnderConstructionView(View.USER_ROLES),
  [View.VIEW_HISTORY_RESPONSABLES]: createUnderConstructionView(
    View.VIEW_HISTORY_RESPONSABLES
  ),
  [View.VIEW_HISTORY_SUPERVISORES]: createUnderConstructionView(
    View.VIEW_HISTORY_SUPERVISORES
  ),
  [View.VIEW_HISTORY_AUXILIARES]: createUnderConstructionView(
    View.VIEW_HISTORY_AUXILIARES
  ),
};
