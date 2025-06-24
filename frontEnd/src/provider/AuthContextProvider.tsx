import { ReactNode, useState, useEffect, useCallback } from "react";
import { User, validateAndCreateUser } from "../actions/types";
import { useSession } from "../services/session";
import { View } from "../views";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

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

const defaultUserInfo: LoginResponse = {
  authenticated: false,
  user: {
    dni: "",
    oficialId: {
      id: "",
      dni: "",
      firstname: "",
      lastname: "",
      legajo: "",
      currentAirportId: {
        aeropuerto: "",
        codIATA: "",
        codOACI: "",
      },
      jerarquiaId: {
        jerarquia: "",
      },
    },
    role: "",
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, error, isError, isLoading, refetch } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<LoginResponse>(defaultUserInfo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);

  useEffect(() => {
    if (!isLoading && data?.authenticated && !error) {
      setIsLoggedIn(true);
      setUserInfo(data);
      setCurrentView(View.DASHBOARD);
      const validatedUser = validateAndCreateUser(
        data.user.role,
        data.user.oficialId.jerarquiaId.jerarquia
      );
      setUser(validatedUser);
    } else if (!isLoading && (!data?.authenticated || error)) {
      setIsLoggedIn(false);
      setUser(null);
      setUserInfo(defaultUserInfo);
      setCurrentView(View.LOGIN);
    }
  }, [data, error, isLoading]);

  const handleLogin = useCallback((loginData: LoginResponse) => {
    setIsLoggedIn(loginData.authenticated);
    setUserInfo(loginData);

    if (loginData.authenticated) {
      if (loginData.user.role) {
        const validatedUser = validateAndCreateUser(
          loginData.user.role,
          loginData.user.oficialId.jerarquiaId.jerarquia
        );
        setUser(validatedUser);
      }
      setCurrentView(View.DASHBOARD);
    } else {
      setCurrentView(View.LOGIN);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setUserInfo(defaultUserInfo);
    setCurrentView(View.LOGIN);
  }, []);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView(isLoggedIn ? View.DASHBOARD : View.LOGIN);
  }, [isLoggedIn]);

  const value: AuthContextType = {
    user,
    userInfo,
    isLoggedIn,
    isLoading,
    error,
    isError,
    currentView,
    setUser,
    setCurrentView,
    setIsLoggedIn,
    refetch,
    handleLogin,
    handleLogout,
    handleNavigate,
    handleBack,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
