import { useAuth } from "./useAuth";

export const useNavigation = () => {
  const { currentView, handleNavigate, handleBack } = useAuth();
  return { currentView, handleNavigate, handleBack };
};
