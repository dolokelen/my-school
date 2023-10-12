import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, CACHE_KEY_SCHOOL_YEAR as CACHE_KEY_GROUP, SCH_YEAR_LIST_ROUTE } from "../data/constants";

import apiClient from "../services/httpService";
import { GroupCreateFormData } from "../GroupsAndPermissions/GroupCreateForm";

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

// export const useEditSchoolYear = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation<SchoolYearEditFormData, Error, SchoolYearEditFormData>({
//     mutationFn: (data: SchoolYearEditFormData) =>
//       apiClients.patch<SchoolYearEditFormData>(data),

//     onSuccess: (existingData, newData) => {
//       navigate(`${AUTH_LAYOUT_ROUTE}/${SCH_YEAR_LIST_ROUTE}?updated=true`);

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_GROUP],
//       });
//     },
//   });
// };

// export const useDeleteSchoolYear = () => {
//   const navigate = useNavigate();

//   const queryClient = useQueryClient();
//   return useMutation<number, Error, number>({
//     mutationFn: (id: number) => apiClients.delete(id),

//     onSuccess: (existingData, newData) => {
//       navigate(`${AUTH_LAYOUT_ROUTE}/${SCH_YEAR_LIST_ROUTE}?deleted=true`);

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_GROUP],
//       });
//     },
//   });
// };
