import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_SEMESTER,
  SEMESTERS_ROUTE,
} from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { useNavigate } from "react-router-dom";
import { SemesterCreateFormData } from "../pages/semesters/SemesterCreateForm";
import { useSemesterseStore } from "../pages/semesters/semesterStore";
import { SemesterEditFormData } from "../pages/semesters/SemesterEditForm";

export interface SimpleSemester {
  id: number;
  name: string;
}

interface Semester {
  id: number;
  name: string;
  school_year: { id: number; year: number };
  enrollment_start_date: string;
  enrollment_end_date: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  courses: { id: number; code: string }[];
}

const SEMESTER_URL = "/school/semesters/";
const apiClients = apiClient<Semester>(SEMESTER_URL);

export const useSemesters = () => {
  const semesterQuery = useSemesterseStore();

  return useQuery<Semester[], Error>({
    queryKey: [CACHE_KEY_SEMESTER, semesterQuery],
    queryFn: () =>
      apiClients.getAll({
        params: {
          ordering: semesterQuery.semesterQuery.semesterName,
        },
      }),
    staleTime: ms("24h"),
  });
};

export const useSemester = (semesterId: number) => {
  return useQuery<Semester, Error>({
    queryKey: [CACHE_KEY_SEMESTER, semesterId],
    queryFn: () => apiClients.get(semesterId),
  });
};

export const useCreateSemester = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<SemesterCreateFormData>(SEMESTER_URL);

  const queryClient = useQueryClient();
  return useMutation<SemesterCreateFormData, Error, SemesterCreateFormData>({
    mutationFn: (data: SemesterCreateFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SEMESTER],
      });
    },
  });
};

export const useEditSemester = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<SemesterEditFormData, Error, SemesterEditFormData>({
    mutationFn: (data: SemesterEditFormData) => apiClients.patch(data),

    onSuccess: (existingData, newData) => {
      onUpdate();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SEMESTER],
      });
    },
  });
};

export const useDeleteSemester = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${SEMESTERS_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_SEMESTER],
      });
    },
  });
};

export const useAddSemesterCourses = (
  data: { id: number; courses_to_add_ids: number[] },
  onAddSelectedItems: () => void
) => {
  const queryClient = useQueryClient();
  const handleCoursesAddition = async () => {
    try {
      await apiClients.patchJsonData(JSON.stringify(data), data.id);
      onAddSelectedItems();
      queryClient.invalidateQueries([CACHE_KEY_SEMESTER]);
    } catch (error) {
      throw error;
    }
  };

  return handleCoursesAddition;
};

interface CurrentSemesterCourse {
  id: number;
  courses: { id: number; code: string }[];
}

export const useCurrentSemesterCourses = () => {
  const apiClients = apiClient<CurrentSemesterCourse>(
    "/school/current-semester-courses/"
  );
  return useQuery<CurrentSemesterCourse[], Error>({
    queryKey: [CACHE_KEY_SEMESTER],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useRemoveSemesterCourses = (
  data: { id: number; courses_to_remove_ids: number[] },
  onDeleteSelectedItems: () => void
) => {
  const queryClient = useQueryClient();
  const handleCoursesRemoval = async () => {
    try {
      await apiClients.patchJsonData(JSON.stringify(data), data.id);
      onDeleteSelectedItems();
      queryClient.invalidateQueries([CACHE_KEY_SEMESTER]);
    } catch (error) {
      throw error;
    }
  };

  return handleCoursesRemoval;
};
