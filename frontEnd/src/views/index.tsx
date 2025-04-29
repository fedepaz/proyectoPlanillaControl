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
  // TODO: Implement this view
  VIEW_HISTORY = "view_history",
  VIEW_PROFILE = "view_profile",
  SETTINGS = "settings",
  MANAGE_USERS = "manage_users",
  REPORTS = "reports",
  USER_ROLES = "user_roles",
}

export interface ViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin?: (data: any) => void;
  onRegister?: (data: boolean) => void;
  onResetPassword?: (data: boolean) => void;
  onGeneratePlanillas?: () => void;
  onBackHome?: () => void;
}

const createUnderConstructionView = (
  featureName: string,
  description?: string,
  estimatedTime?: string
) => {
  return function UnderConstructionView({ onBackHome }: ViewProps) {
    return (
      <UnderConstruction
        featureName={featureName}
        description={description}
        estimatedTime={estimatedTime}
        onBack={() => onBackHome && onBackHome()}
      />
    );
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewComponents: Record<View, React.ComponentType<any>> = {
  [View.LOGIN]: LoginPage,
  [View.REGISTER]: RegisterPage,
  [View.RESET_PASSWORD]: ResetPasswordPage,
  [View.DASHBOARD]: Dashboard,
  [View.LOGOUT]: LogoutPage,
  [View.GENERATE_PLANILLAS]: PlanillasProvider,
  [View.VIEW_HISTORY]: createUnderConstructionView(
    "Historial de Planillas",
    "Se va a implementar aproximadamente en Julio 2025"
  ),
  [View.VIEW_PROFILE]: createUnderConstructionView(
    "Perfil",
    "Se va a implementar aproximadamente en Agosto 2025"
  ),
  [View.SETTINGS]: createUnderConstructionView(
    "Configuración",
    "Se va a implementar aproximadamente en Septiembre 2025"
  ),
  [View.MANAGE_USERS]: createUnderConstructionView(
    "Administrar Usuarios",
    "Se va a implementar aproximadamente en Octubre 2025"
  ),
  [View.REPORTS]: createUnderConstructionView(
    "Reportes",
    "Se va a implementar aproximadamente en Noviembre 2025"
  ),
  [View.USER_ROLES]: createUnderConstructionView(
    "Roles de Usuario",
    "Se va a implementar aproximadamente en Diciembre 2025"
  ),
};
