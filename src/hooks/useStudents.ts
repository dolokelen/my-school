import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useStudentStore } from "../accounts/students/studentStore";
import {
  CACHE_KEY_STUDENT,
  CACHE_KEY_STUDENT_SCH_YRDS,
} from "../cacheKeysAndRoutes";
import apiClient, { formDataConfig } from "../services/httpService";
import { Address } from "./useAddress";
import { SimpleSemester } from "./useSemesters";
import { UserProfile } from "./useUsers";

export interface SimpleStudent {
  user: UserProfile;
  level: string;
  phone: string;
}

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

interface SchoolYearSemester {
  id: number;
  year: string;
  semesters: SimpleSemester[];
}

export const useStudentSchoolYears = (studentId: number) => {
  const apiClients = apiClient<SchoolYearSemester>(
    `/school/students/${studentId}/school-years/`
  );

  return useQuery<SchoolYearSemester[], Error>({
    queryKey: [CACHE_KEY_STUDENT_SCH_YRDS, studentId],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};
