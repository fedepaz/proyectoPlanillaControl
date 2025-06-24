import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "../services/session";
import { User, validateAndCreateUser } from "../actions/types";
import { View } from "../views";

interface AuthContextType {
  user: User | null;
  userInfo: any;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: any;
  currentView: View;
  setUser: (user: User | null) => void;
  setCurrentView: (view: View) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  refetch: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, error, isError, isLoading, refetch } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
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
      setUserInfo(null);
      setCurrentView(View.LOGIN);
    }
  }, [data, error, isLoading]);

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserInfo(null);
    setCurrentView(View.LOGIN);
  };

  const value: AuthContextType = {
    user,
    userInfo,
    isLoggedIn,
    isLoading,
    error,
    currentView,
    setUser,
    setCurrentView,
    setIsLoggedIn,
    refetch,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const useUser = (): User | null => {
  const { user } = useAuth();
  return user;
};

export const useAuthStatus = () => {
  const { isLoggedIn, isLoading, error } = useAuth();
  return { isLoggedIn, isLoading, error };
};
