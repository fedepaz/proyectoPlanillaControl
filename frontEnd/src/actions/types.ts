import { ReactNode } from "react";

export enum UserRole {
  AUXILIAR = "auxiliar",
  OFICIAL = "oficial",
  ADMIN = "admin",
}

export enum ActionCategory {
  MAIN = "main",
  ACCOUNT = "account",
  ADMIN = "admin",
}

export interface ActionButton {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  primary?: boolean;
  category: ActionCategory;
  allowedRoles?: UserRole[];
}
