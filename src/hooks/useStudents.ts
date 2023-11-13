import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_STUDENT } from "../cacheKeysAndRoutes";
import apiClient, { formDataConfig } from "../services/httpService";
import { Address } from "./useAddress";
import { UserProfile } from "./useUsers";
import { useStudentStore } from "../accounts/students/studentStore";

export interface Student {
  user: UserProfile;
  studentaddress: Address;
  phone: string;
  gender: string;
  registration_fee: number;
  birth_date: string;
  religion: string;
  image: string;
  level: string;
  student_number: number;
  is_transfer: boolean;
  major: { id: number; name: string };
  department: { id: number; name: string };
  supervisor: { id: number; full_name: string };
  joined_at: string;
}

const STUDENT_URL = "/school/students/";
const apiClients = apiClient<Student>(STUDENT_URL);

export const useStudents = () => {
  const studentQuery = useStudentStore();

  return useQuery<Student[], Error>({
    queryKey: [CACHE_KEY_STUDENT, studentQuery],
    queryFn: () =>
      apiClients.getAll({
        params: {
          department_id: studentQuery.studentQuery.departmentId,
          major_id: studentQuery.studentQuery.majorId,
          search: studentQuery.studentQuery.searchText,
        },
      }),
    staleTime: ms("24h"),
  });
};

export const useStudent = (studentId: number) => {
  return useQuery<Student, Error>({
    queryKey: [CACHE_KEY_STUDENT, studentId],
    queryFn: () => apiClients.get(studentId),
    staleTime: ms("24h"),
  });
};

export const useStudentProfile = (studentId: number) => {
  const apiClients = apiClient<Student>("/school/student-profile/");

  return useQuery<Student, Error>({
    queryKey: [CACHE_KEY_STUDENT, studentId],
    queryFn: () => apiClients.get(studentId),
    staleTime: ms("24h"),
  });
};

type Data = FormData;
export const useRegisterStudent = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<Data>(STUDENT_URL);
  const queryClient = useQueryClient();
  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.post(data, formDataConfig),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_STUDENT],
      });
    },
  });
};

export const useEditStudent = (onUpdate: () => void, studentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.patchFormData(data, studentId),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_STUDENT],
      });
    },
  });
};
