import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, CACHE_KEY_SCHOOL_YEAR as CACHE_KEY_GROUP, GROUP_ROUTE } from "../data/constants";

import { GroupCreateFormData } from "../GroupsAndPermissions/GroupCreateForm";
import { GroupEditFormData } from "../GroupsAndPermissions/GroupEditForm";
import apiClient from "../services/httpService";

const apiClients = apiClient<Group>("school/groups");

export interface Group {
  id?: number;
  name: string;
  permissions?: number[]
}

export const useGroups = () =>
  useQuery<Group[], Error>({
    queryKey: [CACHE_KEY_GROUP],
    queryFn: apiClients.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24hrs
  });

export const useGroup = (groupId: number) => {
  return useQuery<Group, Error>({
    queryKey: [CACHE_KEY_GROUP, groupId],
    queryFn: () => apiClients.get(groupId),
  });
};

export const useCreateGroup = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation<GroupCreateFormData, Error, GroupCreateFormData>(
    {
      mutationFn: (data: GroupCreateFormData) => apiClients.post(data),

      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_GROUP],
        });
      },
    }
  );
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
      onDelete()

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_GROUP],
      });
    },
  });
};

export const useDeleteAllGroup = (ids: number[], onDeleteAll: () => void) => {
  const queryClient = useQueryClient();
//in a function component hooks can only be called at the top level
//of that component not in another function or hook like the useEffect
//However, in None component you can only call hooks in a function not
//in a block of code like if block.
//Explain the process of checkbox deletions [bulk deletions]
  const handleDeleteAll = async () => {
    try {
      for (const id of ids) {
        await apiClients.delete(id);
      }
      onDeleteAll();
      queryClient.invalidateQueries([CACHE_KEY_GROUP]);
    } catch (error) {
      throw error;
    }
  };

  return handleDeleteAll;
};
