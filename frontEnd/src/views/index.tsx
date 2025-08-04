import type React from "react";
import { lazy } from "react";
import { View } from "../types/types";
import { featureDescriptions } from "./featureDescriptions";

export interface ViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin?: (data: any) => void;
  onRegister?: (data: boolean) => void;
  onResetPassword?: (data: boolean) => void;
  onGeneratePlanillas?: () => void;
  onBackHome?: () => void;
}

const lazyUnderConstruction = (view: View) =>
  lazy(() =>
    import("./UnderConstructionView").then((mod) => ({
      default: mod.createUnderConstructionView(view),
    }))
  );
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
  [View.LOGIN]: lazy(() => import("../login/components/LoginPage")),
  [View.REGISTER]: lazy(() => import("../login/components/RegisterPage")),
  [View.RESET_PASSWORD]: lazy(
    () => import("../login/components/ResetPassword")
  ),
  [View.DASHBOARD]: lazy(() => import("../login/components/Dashboard")),
  [View.LOGOUT]: lazy(() => import("../login/components/LogoutPage")),
  [View.GENERATE_PLANILLAS]: lazy(
    () => import("../planillas/components/PlanillasProvider")
  ),
  [View.VIEW_HISTORY]: lazy(
    () => import("../planillas/components/planillaShow/PlanillaShow")
  ),
  [View.VIEW_PROFILE]: lazyUnderConstruction(View.VIEW_PROFILE),
  [View.SETTINGS]: lazyUnderConstruction(View.SETTINGS),
  [View.MANAGE_USERS]: lazyUnderConstruction(View.MANAGE_USERS),
  [View.REPORTS]: lazyUnderConstruction(View.REPORTS),
  [View.USER_ROLES]: lazyUnderConstruction(View.USER_ROLES),
  [View.VIEW_HISTORY_RESPONSABLES]: lazyUnderConstruction(
    View.VIEW_HISTORY_RESPONSABLES
  ),
  [View.VIEW_HISTORY_SUPERVISORES]: lazyUnderConstruction(
    View.VIEW_HISTORY_SUPERVISORES
  ),
  [View.VIEW_HISTORY_AUXILIARES]: lazyUnderConstruction(
    View.VIEW_HISTORY_AUXILIARES
  ),
};
