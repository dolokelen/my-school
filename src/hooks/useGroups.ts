import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_GROUP,
  GROUP_ROUTE,
} from "../cacheKeysAndRoutes";
import { GroupCreateFormData } from "../GroupsAndPermissions/GroupCreateForm";
import { GroupEditFormData } from "../GroupsAndPermissions/GroupEditForm";
import apiClient from "../services/httpService";
import ms from "ms";

interface Permission {
  id: number;
  name: string;
}
interface Group {
  id?: number;
  name: string;
  permissions?: Permission[];
}
const apiClients = apiClient<Group>("/core/groups/");

export const useGroups = () => {
  return useQuery<Group[], Error>({
    queryKey: [CACHE_KEY_GROUP],
    queryFn: apiClients.getAll,
    staleTime: ms('24h')
  });
};

export const useGroup = (groupId: number) => {
  return useQuery<Group, Error>({
    queryKey: [CACHE_KEY_GROUP, groupId],
    queryFn: () => apiClients.get(groupId),
  });
};

export const useCreateGroup = (onCreate: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<GroupCreateFormData, Error, GroupCreateFormData>({
    mutationFn: (data: GroupCreateFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_GROUP],
      });
    },
  });
};

export const useEditGroup = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<GroupEditFormData, Error, GroupEditFormData>({
    mutationFn: (data: GroupEditFormData) =>
      apiClients.patch<GroupEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_GROUP],
      });
    },
  });
};

export const useDeleteGroup = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_GROUP],
      });
    },
  });
};

export const useDeleteAllGroup = (
  ids: number[],
  onDeleteAll: () => void,
  onDeleSelectedItemsArray: () => void
) => {
  const queryClient = useQueryClient();
  const handleDeleteAll = async () => {
    try {
      for (const id of ids) {
        await apiClients.delete(id);
      }
      onDeleteAll();
      queryClient.invalidateQueries([CACHE_KEY_GROUP]);
      onDeleSelectedItemsArray();
    } catch (error) {
      throw error;
    }
  };

  return handleDeleteAll;
};

export const useUpdateGroupPermissions = (
  data: { id: number, permission_ids_to_remove: number[] },
  onDeleteSelectedItems: () => void
) => {
  const queryClient = useQueryClient();
  const handlePermissionsRemoval = async () => {
    try {
      await apiClients.patchJsonData(JSON.stringify(data), data.id);
      onDeleteSelectedItems();
      queryClient.invalidateQueries([CACHE_KEY_GROUP]);
    } catch (error) {
      throw error;
    }
  };

  return handlePermissionsRemoval;
};

export const useAddGroupPermissions = (
  data: { id: number, permission_ids_to_add: number[] },
  onDeleteSelectedItems: () => void
) => {
  const queryClient = useQueryClient();
  const handlePermissionsRemoval = async () => {
    try {
      await apiClients.patchJsonData(JSON.stringify(data), data.id);
      onDeleteSelectedItems();
      queryClient.invalidateQueries([CACHE_KEY_GROUP]);
    } catch (error) {
      throw error;
    }
  };

  return handlePermissionsRemoval;
};

