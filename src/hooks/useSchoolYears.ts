import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_SCHOOL_YEAR,
  SCH_YEAR_LIST_ROUTE,
} from "../cacheKeysAndRoutes";
import { SchoolYearCreateFormData } from "../pages/schoolYears/SchoolYearCreateForm";
import { SchoolYearEditFormData } from "../pages/schoolYears/SchoolYearEditForm";
import apiClient from "../services/httpService";
import ms from "ms";

interface SchoolYear {
  id?: number;
  year: number;
}
const apiClients = apiClient<SchoolYear>("/school/years/");

export const useSchoolYears = () =>
  useQuery<SchoolYear[], Error>({
    queryKey: [CACHE_KEY_SCHOOL_YEAR],
    queryFn: apiClients.getAll,
    staleTime: ms('24h')
  });

export const useSchoolYear = (schoolYearId: number) => {
  return useQuery<SchoolYear, Error>({
    queryKey: [CACHE_KEY_SCHOOL_YEAR, schoolYearId],
    queryFn: () => apiClients.get(schoolYearId),
  });
};

export const useCreateSchoolYear = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation<SchoolYearCreateFormData, Error, SchoolYearCreateFormData>(
    {
      mutationFn: (data: SchoolYearCreateFormData) => apiClients.post(data),

      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_SCHOOL_YEAR],
        });
      },
    }
  );
};

export const useEditSchoolYear = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<SchoolYearEditFormData, Error, SchoolYearEditFormData>({
    mutationFn: (data: SchoolYearEditFormData) =>
      apiClients.patch<SchoolYearEditFormData>(data),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${SCH_YEAR_LIST_ROUTE}?updated=true`);

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SCHOOL_YEAR],
      });
    },
  });
};

export const useDeleteSchoolYear = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${SCH_YEAR_LIST_ROUTE}?deleted=true`);

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SCHOOL_YEAR],
      });
    },
  });
};
