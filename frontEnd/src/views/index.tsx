import { LoginPage } from "../login/components/LoginPage";
import { RegisterPage } from "../login/components/RegisterPage";
import { LogoutPage } from "../login/components/LogoutPage";
import { Dashboard } from "../login/components/Dashboard";
import { PlanillasProvider } from "../planillas/components/PlanillasProvider";
import { ResetPasswordPage } from "../login/components/ResetPassword";
import React from "react";

export enum View {
  LOGIN = "login",
  REGISTER = "register",
  RESET_PASSWORD = "reset_password",
  DASHBOARD = "dashboard",
  LOGOUT = "logout",
  GENERATE_PLANILLAS = "generate_planillas",
}

export interface ViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin?: (data: any) => void;
  onRegister?: (data: boolean) => void;
  onResetPassword?: (data: boolean) => void;
  onGeneratePlanillas?: () => void;
  onBackHome?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewComponents: Record<View, React.ComponentType<any>> = {
  [View.LOGIN]: LoginPage,
  [View.REGISTER]: RegisterPage,
  [View.RESET_PASSWORD]: ResetPasswordPage,
  [View.DASHBOARD]: Dashboard,
  [View.LOGOUT]: LogoutPage,
  [View.GENERATE_PLANILLAS]: PlanillasProvider,
};
