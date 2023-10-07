import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { SchoolYear } from "./useSchoolYears";
import { CACHE_KEY_SCHOOL_YEAR } from "../data/constants";

const apiClient = new APIClient<SchoolYear>("school/years");
export const useSchoolYear = (schoolYearId: number) => {
    return useQuery<SchoolYear, Error>({
      queryKey: [CACHE_KEY_SCHOOL_YEAR, schoolYearId],
      queryFn: () => apiClient.get(schoolYearId),
    });
}

// export const useDeleteSchoolYear = (schoolYearId: number) => {
//     return useQuery<SchoolYear, Error>({
//       queryKey: [CACHE_KEY_SCHOOL_YEAR, schoolYearId],
//       queryFn: () => apiClient.delete(schoolYearId),
//     });
// }
