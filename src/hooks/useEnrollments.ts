import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_ENROLLMENT } from "../cacheKeysAndRoutes";
import { EnrollmentCreateFormData } from "../pages/enrollments/EnrollmentCreateForm";
import { EnrollmentEditFormData } from "../pages/enrollments/EnrollmentEditForm";
import apiClient from "../services/httpService";
import { CourseAndSection, SimpleCourse } from "./useCourses";
import { SimpleSchoolYear } from "./useSchoolYears";
import { SimpleSection } from "./useSections";
import { SimpleSemester } from "./useSemesters";
import { SimpleStudent } from "./useStudents";

export interface Enrollment {
  id: number;
  student: SimpleStudent;
  semester: SimpleSemester;
  course: SimpleCourse;
  section: SimpleSection;
  school_year: SimpleSchoolYear;
  status: string;
  price_per_credit: number;
  credit: number;
  date: string;
}

const getApiClient = <T>(studentId: number, childEndPoint: string) => {
  const BASE_URL = "/school/students";
  const ENROLLMENT_URL = `${BASE_URL}/${studentId}/${childEndPoint}/`;
  const apiClients = apiClient<T>(ENROLLMENT_URL);

  return apiClients;
};

const ENROLLMENTS_URL = "enrollments";

export const useEnrollments = (studentId: number) => {
  return useQuery<Enrollment[], Error>({
    queryKey: [CACHE_KEY_ENROLLMENT, studentId],
    queryFn: getApiClient<Enrollment>(studentId, ENROLLMENTS_URL).getAll,
    staleTime: ms("24h"),
  });
};

export const useSectionEnrollments = (sectionId: number) => {
  const endpoint = `/school/sections/${sectionId}/current-semester-section-enrollments/`;
  const apiClients = apiClient<Enrollment>(endpoint);
  return useQuery<Enrollment[], Error>({
    queryKey: [CACHE_KEY_ENROLLMENT, sectionId],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useEnrollmentCourses = (studentId: number) => {
  return useQuery<CourseAndSection[], Error>({
    queryKey: [studentId],
    queryFn: getApiClient<CourseAndSection>(studentId, "eligible-courses")
      .getAll,
    staleTime: ms("24h"),
  });
};

export const useEnrollment = (studentId: number, enrollmentId: number) => {
  return useQuery<Enrollment, Error>({
    queryKey: [CACHE_KEY_ENROLLMENT, enrollmentId, studentId],
    queryFn: () =>
      getApiClient<Enrollment>(studentId, "enrollments").get(enrollmentId),
  });
};

export const useCreateEnrollment = (
  studentId: number,
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation<EnrollmentCreateFormData, Error, EnrollmentCreateFormData>(
    {
      mutationFn: (data: EnrollmentCreateFormData) =>
        getApiClient<EnrollmentCreateFormData>(studentId, ENROLLMENTS_URL).post(
          data
        ),

      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_ENROLLMENT, studentId],
        });
      },
    }
  );
};

export const useEditEnrollment = (studentId: number, onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<EnrollmentEditFormData, Error, EnrollmentEditFormData>({
    mutationFn: (data: EnrollmentEditFormData) =>
      getApiClient<EnrollmentEditFormData>(studentId, ENROLLMENTS_URL).patch(
        data
      ),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_ENROLLMENT, studentId],
      });
    },
  });
};

//YOU ONLY NEED TO UNCOMMENT IT, IT'S FULLY CONFIGURED!
// export const useDeleteAttendance = (studentId: number, onDelete: () => void) => {
//   const navigate = useNavigate();

//   const queryClient = useQueryClient();
//   return useMutation<number, Error, number>({
//     mutationFn: (id: number) => getApiClient(studentId, ENROLLMENTS_URL).delete(id),

//     onSuccess: (existingData, newData) => {
//       navigate(`${AUTH_LAYOUT_ROUTE}/${ENROLLMENTS_URL}`);
//       onDelete();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_ENROLLMENT],
//       });
//     },
//   });
// };
