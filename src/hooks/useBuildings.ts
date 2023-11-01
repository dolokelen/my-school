import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_BUILDING } from "../cacheKeysAndRoutes";
import { BuildingCreateFormData } from "../pages/buildings/BuildingCreateForm";
import apiClient from "../services/httpService";

interface Building {
  id: number;
  name: string;
  dimension: string;
  office_counts: number;
  classroom_counts: number;
  toilet_counts: number;
  date_constructed: string;
}

const BUILDING_URL = "/school/buildings/";
const apiClients = apiClient<Building>(BUILDING_URL);

export const useBuildings = () => {
  return useQuery<Building[], Error>({
    queryKey: [CACHE_KEY_BUILDING],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useBuilding = (buildingId: number) => {

  return useQuery<Building, Error>({
    queryKey: [CACHE_KEY_BUILDING, buildingId],
    queryFn: () => apiClients.get(buildingId),
  });
};

export const useCreateBuilding = (
  onCreate: () => void,
  reset: () => void
) => {
  const apiClients = apiClient<BuildingCreateFormData>(BUILDING_URL);

  const queryClient = useQueryClient();
  return useMutation<BuildingCreateFormData, Error, BuildingCreateFormData>(
    {
      mutationFn: (data: BuildingCreateFormData) => apiClients.post(data),

      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_BUILDING],
        });
      },
    }
  );
};

// export const useEditDepartment = (onUpdate: () => void) => {
//   const queryClient = useQueryClient();

//   return useMutation<DepartmentEditFormData, Error, DepartmentEditFormData>({
//     mutationFn: (data: DepartmentEditFormData) =>
//       apiClients.patch<DepartmentEditFormData>(data),

//     onSuccess: (existingData, newData) => {
//       onUpdate();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_DEPARTMENT],
//       });
//     },
//   });
// };

// export const useEditDepartmentAddress = (onUpdate: () => void) => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     DepartmentAddressEditFormData,
//     Error,
//     DepartmentAddressEditFormData
//   >({
//     mutationFn: (data: DepartmentAddressEditFormData) =>
//       apiClients.patchNested<DepartmentAddressEditFormData>(
//         data,
//         "address",
//         data.id
//       ),

//     onSuccess: (existingData, newData) => {
//       onUpdate();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_DEPARTMENT],
//       });
//     },
//   });
// };

// export const useEditDepartmentContact = (onUpdate: () => void) => {
//   const queryClient = useQueryClient();

//   const departmentContactId = useDepartmentContactStore(
//     (s) => s.departmentContactQuery.departmentContactId
//   );

//   return useMutation<
//     DepartmentContactEditFormData,
//     Error,
//     DepartmentContactEditFormData
//   >({
//     mutationFn: (data: DepartmentContactEditFormData) =>
//       apiClients.patchNested<DepartmentContactEditFormData>(
//         data,
//         "contacts",
//         departmentContactId
//       ),

//     onSuccess: (existingData, newData) => {
//       onUpdate();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_DEPARTMENT],
//       });
//     },
//   });
// };

// export const useDeleteDepartment = (onDelete: () => void) => {
//   const navigate = useNavigate();

//   const queryClient = useQueryClient();
//   return useMutation<number, Error, number>({
//     mutationFn: (id: number) => apiClients.delete(id),

//     onSuccess: (existingData, newData) => {
//       navigate(`${AUTH_LAYOUT_ROUTE}/${DEPARTMENTS_ROUTE}`);
//       onDelete();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_DEPARTMENT],
//       });
//     },
//   });
// };
