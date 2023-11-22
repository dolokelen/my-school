import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_COURSE,
  COURSES_LIST_ROUTE,
} from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { useCourseStore } from "../pages/courses/courseStore";
import { CourseCreateFormData } from "../pages/courses/CourseCreateForm";
import { CourseEditFormData } from "../pages/courses/CourseEditForm";
import { useNavigate } from "react-router-dom";
import { SimpleSection } from "./useSections";

export interface SimpleCourse {
  id: number;
  code: string;
}

export interface CourseAndSection {
  id: number;
  code: string;
  sections: SimpleSection[];
}

interface Course {
  id: number;
  code: string;
  title: string;
  level: string;
  price_per_credit: number;
  credit: number;
  departments: { id: number; name: string }[];
  prerequisite: { id: number; code: string };
  sections: { id: number; name: string }[];
  additional_fee: number;
  total_price: number;
}
const COURSE_URL = "/school/courses/";
const apiClients = apiClient<Course>(COURSE_URL);

export const useCourses = () => {
  const courseQuery = useCourseStore();

  return useQuery<Course[], Error>({
    queryKey: [CACHE_KEY_COURSE, courseQuery],
    queryFn: () =>
      apiClients.getAll({
        params: {
          department_id: courseQuery.courseQuery?.departmentId,
          prerequisite: courseQuery.courseQuery?.prerequisite,
          search: courseQuery.courseQuery?.searchText,
        },
      }),
    staleTime: ms("24h"),
  });
};

export const useCourse = (courseId: number) => {
  return useQuery<Course, Error>({
    queryKey: [CACHE_KEY_COURSE, courseId],
    queryFn: () => apiClients.get(courseId),
  });
};

export const useCreateCourse = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<CourseCreateFormData>(COURSE_URL);

  const queryClient = useQueryClient();
  return useMutation<CourseCreateFormData, Error, CourseCreateFormData>({
    mutationFn: (data: CourseCreateFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_COURSE],
      });
    },
  });
};

export const useEditCourse = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<CourseEditFormData, Error, CourseEditFormData>({
    mutationFn: (data: CourseEditFormData) =>
      apiClients.patch<CourseEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_COURSE],
      });
    },
  });
};

export const useDeleteCourse = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_COURSE],
      });
    },
  });
};
