import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_EMPLOYEE } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { Office } from "./useOffices";
import { UserProfile } from "./useUsers";

export interface Employee {
  user: UserProfile
  gender: string;
  marital_status: string;
  employment_status: string;
  birth_date: string;
  religion: string;
  salary: number;
  term_of_reference: string;
  image: string;
  department: {name: string};
  supervisor: {full_name: string};
  office: Office
  joined_at: string;
}

const EMPLOYEE_URL = "/school/employees/";
const apiClients = apiClient<Employee>(EMPLOYEE_URL);

export const useEmployees = () =>
  useQuery<Employee[], Error>({
    queryKey: [CACHE_KEY_EMPLOYEE],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });

export const useEmployee = (employeeId: number) => {
  return useQuery<Employee, Error>({
    queryKey: [CACHE_KEY_EMPLOYEE, employeeId],
    queryFn: () => apiClients.get(employeeId),
    staleTime: ms("24h"),
  });
};

type Data = FormData;
export const useRegisterEmployee = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<Data>(EMPLOYEE_URL)
  const queryClient = useQueryClient();
  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_EMPLOYEE],
      });
    },
  });
};

// interface UserProfile {
//   id: number;
//   username: string;
//   email: string;
//   first_name: string;
//   last_name: string;
// }
// export const useUserProfile = () => {
//   const apiClients = apiClient<UserProfile>("/auth/users/me");
//   return useQuery<UserProfile, Error>({
//     queryKey: ["userProfile", getUserId()],
//     queryFn: apiClients.getUserProfile,
//     staleTime: ms("24h"),
//   });
// };

// interface UserGroupsPermissions {
//     id: number;
//     name: string;
//     permissions: Permission[];
// }
// export const useUserGroupsPermissions = (userId: number) => {
//   const apiClients = apiClient<UserGroupsPermissions>("/core/user_groups/");
//   return useQuery<UserGroupsPermissions[], Error>({
//     queryKey: ["userGroupsPermissions", getUserId()],
//     queryFn: () => apiClients.getEntity(userId),
//     staleTime: ms("24h"),
//   });
// };

// export const useEditUser = (onUpdate: () => void) => {
//   const queryClient = useQueryClient();

//   return useMutation<UserEditFormData, Error, UserEditFormData>({
//     mutationFn: (data: UserEditFormData) =>
//       apiClients.patch<UserEditFormData>(data),

//     onSuccess: (existingData, newData) => {
//       onUpdate();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_USER],
//       });
//     },
//   });
// };

// export const useAddGroupsToUser = (
//   data: { pk: number; group_to_add_ids: number[] },
//   onAddSelectedGroupIds: () => void
// ) => {
//   const apiClients = apiClient<{ pk: number; group_to_add_ids: number[] }>(
//     CORE_USERS_URL
//   );
//   const queryClient = useQueryClient();
//   const handleAddGroupsToUser = async () => {
//     try {
//       await apiClients.patchJsonData(JSON.stringify(data), data.pk);
//       onAddSelectedGroupIds();
//       return queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] });
//     } catch (error) {
//       throw error;
//     }
//   };

//   return handleAddGroupsToUser;
// };

// export const useRemoveGroupsFromUser = (
//   data: { pk: number; group_to_remove_ids: number[] },
//   onRemoveSelectedGroupIds: () => void
// ) => {
//   const apiClients = apiClient<{ pk: number; group_to_remove_ids: number[] }>(
//     CORE_USERS_URL
//   );
//   const queryClient = useQueryClient();
//   const handleRemoveGroupsFormUser = async () => {
//     try {
//       await apiClients.patchJsonData(JSON.stringify(data), data.pk);
//       onRemoveSelectedGroupIds();
//       return queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] });
//     } catch (error) {
//       throw error;
//     }
//   };

//   return handleRemoveGroupsFormUser;
// };
