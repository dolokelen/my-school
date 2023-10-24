import { useUserGroupsPermissions } from "../hooks/useUsers";
import getUserId from "./getUserId";

export const hasPermission = (permissionName: string) => {
  const { data: groups } = useUserGroupsPermissions(getUserId()!);

  let hasPermission;
  hasPermission = groups?.find((g) =>
    g.permissions?.some((p) => p.name === permissionName)
  );
  return hasPermission;
};
