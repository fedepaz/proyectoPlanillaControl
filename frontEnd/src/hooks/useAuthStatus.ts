import { useAuth } from "./useAuth";

export const useAuthStatus = () => {
  const { isLoggedIn, isLoading, error } = useAuth();
  return { isLoggedIn, isLoading, error };
};
