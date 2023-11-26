import { useMutation } from "@tanstack/react-query";
import apiClient, { formDataConfig } from "./../services/httpService";

export const useUploadStudentGrade = (
  teacherId: number,
  teachId: number,
  onUpload: () => void
) => {
  const GRADE_URL = `school/teachers/${teacherId}/teaches/${teachId}/grades/`;
  const apiClients = apiClient<FormData>(GRADE_URL);
  //   const queryClient = useQueryClient();
  return useMutation<FormData, Error, FormData>({
    mutationFn: (data: FormData) => apiClients.post(data, formDataConfig),

    onSuccess: (existingData, newData) => {
      onUpload();

      //   return queryClient.invalidateQueries({
      //     queryKey: [CACHE_KEY_EMPLOYEE],
      //   });
    },
  });
};
