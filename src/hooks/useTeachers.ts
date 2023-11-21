import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import apiClient, { formDataConfig } from "../services/httpService";
import { Office } from "./useOffices";
import { UserProfile } from "./useUsers";
import { Address } from "./useAddress";
import { CACHE_KEY_TEACHER } from "../cacheKeysAndRoutes";
import { useTeacherStore } from "../accounts/teachers/teacherStore";

export interface TeacherMentee {
  user: UserProfile;
  level: string;
  phone: string;
}

export interface SimpleTeacher {
  id: number;
  full_name: string;
}

export interface Teacher {
  user: UserProfile;
  teacheraddress: Address;
  phone: string;
  gender: string;
  marital_status: string;
  employment_status: string;
  birth_date: string;
  religion: string;
  salary: number;
  level_of_education: string;
  term_of_reference: string;
  image: string;
  department: { id: number; name: string };
  supervisor: { id: number; full_name: string };
  mentees: TeacherMentee[];
  office: Office;
  joined_at: string;
}

const TEACHER_URL = "/school/teachers/";
const apiClients = apiClient<Teacher>(TEACHER_URL);

export const useTeachers = () => {
  const teacherQuery = useTeacherStore();
  return useQuery<Teacher[], Error>({
    queryKey: [CACHE_KEY_TEACHER, teacherQuery],
    queryFn: () =>
      apiClients.getAll({
        params: {
          department_id: teacherQuery.teacherQuery.selectedDepartmentId,
        },
      }),
    staleTime: ms("24h"),
  });
};

export const useTeacher = (teacherId: number) => {
  return useQuery<Teacher, Error>({
    queryKey: [CACHE_KEY_TEACHER, teacherId],
    queryFn: () => apiClients.get(teacherId),
    staleTime: ms("24h"),
  });
};

export const useTeacherProfile = (teacherId: number) => {
  const apiClients = apiClient<Teacher>("/school/teacher-profile/");

  return useQuery<Teacher, Error>({
    queryKey: [CACHE_KEY_TEACHER, teacherId],
    queryFn: () => apiClients.get(teacherId),
    staleTime: ms("24h"),
  });
};

type Data = FormData;
export const useRegisterTeacher = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<Data>(TEACHER_URL);
  const queryClient = useQueryClient();
  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.post(data, formDataConfig),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_TEACHER],
      });
    },
  });
};

export const useEditTeacher = (onUpdate: () => void, teacherId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.patchFormData(data, teacherId),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_TEACHER],
      });
    },
  });
};
