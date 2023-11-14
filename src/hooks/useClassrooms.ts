import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_CLASSROOM,
  CLASSROOMS_ROUTE,
} from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { ClassroomCreateFormData } from "../pages/classrooms/ClassroomCreateForm";
import { ClassroomEditFormData } from "../pages/classrooms/ClassroomEditForm";

export interface Classroom {
  id: number;
  name: string;
  dimension: string;
  created_at: string;
  building: { id: number; name: string };
}

const CLASSROOM_URL = "/school/classrooms/";
const apiClients = apiClient<Classroom>(CLASSROOM_URL);

export const useClassrooms = () =>
  useQuery<Classroom[], Error>({
    queryKey: [CACHE_KEY_CLASSROOM],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });

export const useClassroom = (classroomId: number) => {
  return useQuery<Classroom, Error>({
    queryKey: [CACHE_KEY_CLASSROOM, classroomId],
    queryFn: () => apiClients.get(classroomId),
  });
};

export const useCreateClassroom = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<ClassroomCreateFormData>(CLASSROOM_URL);

  const queryClient = useQueryClient();

  return useMutation<ClassroomCreateFormData, Error, ClassroomCreateFormData>({
    mutationFn: (data: ClassroomCreateFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CLASSROOM],
      });
    },
  });
};

export const useEditClassroom = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ClassroomEditFormData, Error, ClassroomEditFormData>({
    mutationFn: (data: ClassroomEditFormData) =>
      apiClients.patch<ClassroomEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CLASSROOM],
      });
    },
  });
};

export const useDeleteClassroom = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${CLASSROOMS_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CLASSROOM],
      });
    },
  });
};
