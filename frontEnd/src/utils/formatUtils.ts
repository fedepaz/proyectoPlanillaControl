import { UserRole } from "../actions/types";

export function formatRoleName(role: UserRole): string {
  const roleStr = role.toString();
  return roleStr.charAt(0).toUpperCase() + roleStr.slice(1);
}
