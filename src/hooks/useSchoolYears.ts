import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_SCHOOL_YEAR } from "../data/constants";
import { SchoolYearFormData } from "../pages/schoolYears/SchoolYearCreateForm";
import APIClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const apiClient = new APIClient<SchoolYear>("school/years");
// const apiClient = new APIClient<SchoolYear>("school/years/");
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

export const useCreateSchoolYear = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation<
    SchoolYearFormData,
    Error,
    SchoolYearFormData,
    CreateSchoolYearContext
  >({
    mutationFn: (data: SchoolYearFormData) => apiClient.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SCHOOL_YEAR],
      });
    },

    onError: (error, newData, context) => error,
  });
};

export const useEditSchoolYear = (onCreate: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<SchoolYear, Error, SchoolYear, CreateSchoolYearContext>({
    mutationFn: (data: SchoolYear) => apiClient.patch<SchoolYear>(data),

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
  });
};


export const useDeleteSchoolYear = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error,number>({
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


















