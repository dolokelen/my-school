import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/httpService";
import { Classtime } from "./useClasstimes";
import { AUTH_LAYOUT_ROUTE, CACHE_KEY_SECTION, SECTIONS_ROUTE } from "../cacheKeysAndRoutes";
import { SectionCreateFormData } from "../pages/sections/SectionCreateForm";
import { SectionEditFormData } from "../pages/sections/SectionEditForm";

export interface Section {
  id: number;
  name: string;
  course: { id: number; code: string };
  classroom: { id: number; name: string };
  classtime: Classtime;
}

const SECTION_URL = "/school/sections/";
const apiClients = apiClient<Section>(SECTION_URL);

export const useSections = () =>
  useQuery<Section[], Error>({
    queryKey: [CACHE_KEY_SECTION],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });

export const useSection = (sectionId: number) => {
  return useQuery<Section, Error>({
    queryKey: [CACHE_KEY_SECTION, sectionId],
    queryFn: () => apiClients.get(sectionId),
  });
};

export const useCreateSection = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<SectionCreateFormData>(SECTION_URL);

  const queryClient = useQueryClient();

  return useMutation<SectionCreateFormData, Error, SectionCreateFormData>({
    mutationFn: (data: SectionCreateFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SECTION],
      });
    },
  });
};

export const useEditSection = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<SectionEditFormData, Error, SectionEditFormData>({
    mutationFn: (data: SectionEditFormData) =>
      apiClients.patch<SectionEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SECTION],
      });
    },
  });
};

export const useDeleteSection = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${SECTIONS_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SECTION],
      });
    },
  });
};
