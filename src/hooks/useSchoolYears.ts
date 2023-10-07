import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_SCHOOL_YEAR } from "../data/constants";
import { SchoolYearFormData } from "../pages/schoolYears/SchoolYearCreateForm";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<SchoolYear>("school/years/");
interface CreateSchoolYearContext {
  previousSchoolYear: SchoolYear[];
}
interface SchoolYear {
  id?: number;
  year: number;
}

export const useSchoolYear = () =>
  useQuery<SchoolYear[], Error>({
    queryKey: [CACHE_KEY_SCHOOL_YEAR],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24hrs
  });

export const useCreateSchoolYear = (onCreate: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<
    SchoolYearFormData,
    Error,
    SchoolYearFormData,
    CreateSchoolYearContext
  >({
    mutationFn: (data: SchoolYearFormData) => apiClient.post(data),

    onSuccess: (existingData, newData) => {
      console.log("Success!")
      onCreate();
      return queryClient.invalidateQueries({ queryKey: [CACHE_KEY_SCHOOL_YEAR] });

    },

    onError: (error, newData, context) => error,
  });
};
