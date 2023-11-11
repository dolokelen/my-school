import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_MAJOR,
  MAJORS_ROUTE,
} from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { useNavigate } from "react-router-dom";
import { MajorCreateFormData } from "../pages/majors/MajorCreateForm";
import { MajorEditFormData } from "../pages/majors/MajorEditForm";
import { useMajorStore } from "../pages/majors/majorStore";

export interface Major {
  id: number;
  name: string;
  department: { id: number; name: string };
}
const MAJOR_URL = "/school/majors/";
const apiClients = apiClient<Major>(MAJOR_URL);

export const useMajors = () => {
  const majorQuery = useMajorStore();

  return useQuery<Major[], Error>({
    queryKey: [CACHE_KEY_MAJOR, majorQuery],
    queryFn: () =>
      apiClients.getAll({
        params: { department_id: majorQuery.majorQuery.selectedDepartmentId },
      }),
    staleTime: ms("24h"),
  });
};

export const useMajor = (majorId: number) => {
  return useQuery<Major, Error>({
    queryKey: [CACHE_KEY_MAJOR, majorId],
    queryFn: () => apiClients.get(majorId),
  });
};

export const useCreateMajor = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<MajorCreateFormData>(MAJOR_URL);

  const queryClient = useQueryClient();
  return useMutation<MajorCreateFormData, Error, MajorCreateFormData>({
    mutationFn: (data: MajorCreateFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_MAJOR],
      });
    },
  });
};

export const useEditMajor = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<MajorEditFormData, Error, MajorEditFormData>({
    mutationFn: (data: MajorEditFormData) =>
      apiClients.patch<MajorEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_MAJOR],
      });
    },
  });
};

export const useDeleteMajor = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${MAJORS_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_MAJOR],
      });
    },
  });
};
