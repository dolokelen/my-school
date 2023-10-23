import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_USER } from "../cacheKeysAndRoutes";
import { UserEditFormData } from "../pages/users/UserEditForm";
import apiClient from "../services/httpService";
import getUserId from "../Utilities/getUserId";
import { Permission } from "./usePermissions";

interface Group {
  id: number;
  name: string;
}
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  groups: Group[];
}

const CORE_USERS_URL = "/core/users/";
const apiClients = apiClient<User>(CORE_USERS_URL);

export const useUsers = () =>
  useQuery<User[], Error>({
    queryKey: [CACHE_KEY_USER],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });

export const useUser = (userId: number) => {
  return useQuery<User, Error>({
    queryKey: [CACHE_KEY_USER, userId],
    queryFn: () => apiClients.get(userId),
    staleTime: ms("24h"),
  });
};

interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
export const useUserProfile = () => {
  const apiClients = apiClient<UserProfile>("/auth/users/me");
  return useQuery<UserProfile, Error>({
    queryKey: ["userProfile", getUserId()],
    queryFn: apiClients.getUserProfile,
    staleTime: ms("24h"),
  });
};

interface UserGroupsPermissions {
    id: number;
    name: string;
    permissions: Permission[];
}
export const useUserGroupsPermissions = (userId: number) => {
  const apiClients = apiClient<UserGroupsPermissions>("/core/user_groups/");
  return useQuery<UserGroupsPermissions[], Error>({
    queryKey: ["userGroupsPermissions", getUserId()],
    queryFn: () => apiClients.getEntity(userId),
    staleTime: ms("24h"),
  });
};

export const useEditUser = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<UserEditFormData, Error, UserEditFormData>({
    mutationFn: (data: UserEditFormData) =>
      apiClients.patch<UserEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_USER],
      });
    },
  });
};

export const useAddGroupsToUser = (
  data: { pk: number; group_to_add_ids: number[] },
  onAddSelectedGroupIds: () => void
) => {
  const apiClients = apiClient<{ pk: number; group_to_add_ids: number[] }>(
    CORE_USERS_URL
  );
  const queryClient = useQueryClient();
  const handleAddGroupsToUser = async () => {
    try {
      await apiClients.patchJsonData(JSON.stringify(data), data.pk);
      onAddSelectedGroupIds();
      return queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] });
    } catch (error) {
      throw error;
    }
  };

  return handleAddGroupsToUser;
};

export const useRemoveGroupsFromUser = (
  data: { pk: number; group_to_remove_ids: number[] },
  onRemoveSelectedGroupIds: () => void
) => {
  const apiClients = apiClient<{ pk: number; group_to_remove_ids: number[] }>(
    CORE_USERS_URL
  );
  const queryClient = useQueryClient();
  const handleRemoveGroupsFormUser = async () => {
    try {
      await apiClients.patchJsonData(JSON.stringify(data), data.pk);
      onRemoveSelectedGroupIds();
      return queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] });
    } catch (error) {
      throw error;
    }
  };

  return handleRemoveGroupsFormUser;
};
