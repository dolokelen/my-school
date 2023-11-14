import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/httpService";
import { AUTH_LAYOUT_ROUTE, CACHE_KEY_CLASSTIME, CLASSTIMES_ROUTE } from "../cacheKeysAndRoutes";
import { ClasstimeCreateFormData } from "../pages/classtimes/ClasstimeCreateForm";
import { ClasstimeEditFormData } from "../pages/classtimes/ClasstimeEditForm";


export interface Classtime {
  id: number;
  start_time: string;
  end_time: string;
  week_days: string;
}

const CLASSROOM_URL = "/school/classtimes/";
const apiClients = apiClient<Classtime>(CLASSROOM_URL);

export const useClasstimes = () =>
  useQuery<Classtime[], Error>({
    queryKey: [CACHE_KEY_CLASSTIME],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });

export const useClasstime = (classtimeId: number) => {
  return useQuery<Classtime, Error>({
    queryKey: [CACHE_KEY_CLASSTIME, classtimeId],
    queryFn: () => apiClients.get(classtimeId),
  });
};

export const useCreateClasstime = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<ClasstimeCreateFormData>(CLASSROOM_URL);

  const queryClient = useQueryClient();

  return useMutation<ClasstimeCreateFormData, Error, ClasstimeCreateFormData>({
    mutationFn: (data: ClasstimeCreateFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CLASSTIME],
      });
    },
  });
};

export const useEditClasstime = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ClasstimeEditFormData, Error, ClasstimeEditFormData>({
    mutationFn: (data: ClasstimeEditFormData) =>
      apiClients.patch<ClasstimeEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CLASSTIME],
      });
    },
  });
};

export const useDeleteClasstime = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${CLASSTIMES_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CLASSTIME],
      });
    },
  });
};
