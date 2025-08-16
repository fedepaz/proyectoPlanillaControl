import { createContext } from "react";
import { User } from "../actions/types";
import { View } from "../types/types";
import { LoginResponse } from "../types/auth";

export interface AuthContextType {
  // User state
  user: User | null;
  userInfo: LoginResponse;
  isLoggedIn: boolean;

  // Session state
  isLoading: boolean;
  error: string | Error | null;
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
