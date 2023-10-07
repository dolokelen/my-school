import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CACHE_KEY_SCHOOL_YEAR } from "../data/constants";
import { SchoolYearCreateFormData } from "../pages/schoolYears/SchoolYearCreateForm";
import { SchoolYearEditFormData } from "../pages/schoolYears/SchoolYearEditForm";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<SchoolYear>("school/years");
interface CreateSchoolYearContext {
  previousSchoolYear: SchoolYear[];
}

export interface SchoolYear {
  id?: number;
  year: number;
}

export const useSchoolYears = () =>
  useQuery<SchoolYear[], Error>({
    queryKey: [CACHE_KEY_SCHOOL_YEAR],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24hrs
  });

export const useSchoolYear = (schoolYearId: number) => {
  return useQuery<SchoolYear, Error>({
    queryKey: [CACHE_KEY_SCHOOL_YEAR, schoolYearId],
    queryFn: () => apiClient.get(schoolYearId),
  });
};

export const useCreateSchoolYear = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation<SchoolYearCreateFormData, Error, SchoolYearCreateFormData>(
    {
      mutationFn: (data: SchoolYearCreateFormData) => apiClient.post(data),

      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_SCHOOL_YEAR],
        });
      },

      onError: (error, newData, context) => {
        throw error;
      },
    }
  );
};

export const useEditSchoolYear = (onCreate: () => void, reset: () => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<SchoolYearEditFormData, Error, SchoolYearEditFormData>({
    mutationFn: (data: SchoolYearEditFormData) =>
      apiClient.patch<SchoolYearEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      navigate("/school-years");

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SCHOOL_YEAR],
      });
    },

    onError: (error, newData, context) => {
      throw error;
    },
  });
};

export const useDeleteSchoolYear = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClient.delete(id),

    onSuccess: (existingData, newData) => {
      navigate("/school-years");

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SCHOOL_YEAR],
      });
    },

    onError: (error, newData, context) => {
      throw error;
    },
  });
};
