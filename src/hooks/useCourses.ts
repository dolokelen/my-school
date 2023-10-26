import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_COURSE } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { useCourseStore } from "../pages/courses/courseStore";
import { CourseCreateFormData } from "../pages/courses/CourseCreateForm";

interface Course {
  id: number;
  code: string;
  title: string;
  level: string;
  department: string;
  price_per_credit: number;
  credit: number;
  prerequisite: number;
  additional_fee: number;
  total_price: number;
}
const COURSE_URL = "/school/courses/"
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
          search: courseQuery.courseQuery?.searchText
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

export const useCreateCourse = (
  onCreate: () => void,
  reset: () => void
) => {
  const apiClients = apiClient<CourseCreateFormData>(COURSE_URL);

  const queryClient = useQueryClient();
  return useMutation<CourseCreateFormData, Error, CourseCreateFormData>(
    {
      mutationFn: (data: CourseCreateFormData) => apiClients.post(data),

      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_COURSE],
        });
      },
    }
  );
};

// export const useEditSchoolYear = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation<SchoolYearEditFormData, Error, SchoolYearEditFormData>({
//     mutationFn: (data: SchoolYearEditFormData) =>
//       apiClients.patch<SchoolYearEditFormData>(data),

//     onSuccess: (existingData, newData) => {
//       navigate(`${AUTH_LAYOUT_ROUTE}/${SCH_YEAR_LIST_ROUTE}?updated=true`);

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_SCHOOL_YEAR],
//       });
//     },
//   });
// };

// export const useDeleteSchoolYear = () => {
//   const navigate = useNavigate();

//   const queryClient = useQueryClient();
//   return useMutation<number, Error, number>({
//     mutationFn: (id: number) => apiClients.delete(id),

//     onSuccess: (existingData, newData) => {
//       navigate(`${AUTH_LAYOUT_ROUTE}/${SCH_YEAR_LIST_ROUTE}?deleted=true`);

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_SCHOOL_YEAR],
//       });
//     },
//   });
// };
