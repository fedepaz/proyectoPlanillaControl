import { User } from "../actions/types";
import { useAuth } from "./useAuth";

export const useUser = (): User | null => {
  const { user } = useAuth();
  return user;
};
