import { UserHierarchy, UserRole } from "../actions/types";

export function formatRoleName(role: UserRole): string {
  const roleStr = role.toString();
  return roleStr.charAt(0).toUpperCase() + roleStr.slice(1);
}

export function formatHierarchyName(hierarchy: UserHierarchy): string {
  const hierarchyStr = hierarchy.toString();
  return hierarchyStr.charAt(0).toUpperCase() + hierarchyStr.slice(1);
}
