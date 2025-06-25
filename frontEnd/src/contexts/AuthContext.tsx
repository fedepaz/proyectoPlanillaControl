import { createContext } from "react";
import { User } from "../actions/types";
import { View } from "../views";

interface LoginResponse {
  authenticated: boolean;
  user: {
    dni: string;
    oficialId: {
      id?: string;
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
      currentAirportId: {
        id?: string;
        aeropuerto: string;
        codIATA: string;
        codOACI: string;
      };
      jerarquiaId: {
        jerarquia: string;
      };
    };
    role: string;
  };
}

export interface AuthContextType {
  // User state
  user: User | null;
  userInfo: LoginResponse;
  isLoggedIn: boolean;

  // Session state
  isLoading: boolean;
  error: any;
  isError: boolean;

  // Navigation state
  currentView: View;

  // Actions
  setUser: (user: User | null) => void;
  setCurrentView: (view: View) => void;
  setIsLoggedIn: (logged: boolean) => void;
  refetch: () => void;

  // Handlers
  handleLogin: (loginData: LoginResponse) => void;
  handleLogout: () => void;
  handleNavigate: (view: View) => void;
  handleBack: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
