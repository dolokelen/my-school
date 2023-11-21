import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import apiClient from "../services/httpService";
import { SimpleSchoolYear } from "./useSchoolYears";
import { SimpleSection } from "./useSections";
import { SimpleSemester } from "./useSemesters";
import { SimpleTeacher } from "./useTeachers";
import { CACHE_KEY_TEACH } from "../cacheKeysAndRoutes";
import { SimpleCourse } from "./useCourses";
import { SimpleStudent } from "./useStudents";


export interface Teach {
  id: number;
  student: SimpleStudent;
  course: SimpleCourse;
  section: SimpleSection;
  teacher: SimpleTeacher;
  semester: SimpleSemester;
  school_year: SimpleSchoolYear;
  date: string;
}

const getApiClient = <T>(teacherId: number, childEndPoint: string) => {
  const BASE_URL = "/school/teachers";
  const ENROLLMENT_URL = `${BASE_URL}/${teacherId}/${childEndPoint}/`;
  const apiClients = apiClient<T>(ENROLLMENT_URL);

  return apiClients;
};

const TEACHE_URL = "teaches";

export const useTeacherSections = (teacherId: number) => {
  return useQuery<Teach[], Error>({
    queryKey: [CACHE_KEY_TEACH, teacherId],
    queryFn: getApiClient<Teach>(teacherId, TEACHE_URL).getAll,
    staleTime: ms("24h"),
  });
};

// export const useSectionEnrollments = (sectionId: number) => {
//   const endpoint = `/school/sections/${sectionId}/current-semester-section-enrollments/`;
//   const apiClients = apiClient<Teach>(endpoint);
//   return useQuery<Teach[], Error>({
//     queryKey: [CACHE_KEY_ENROLLMENT, sectionId],
//     queryFn: apiClients.getAll,
//     staleTime: ms("24h"),
//   });
// };

// export const useEnrollmentCourses = (sectionId: number) => {
//   return useQuery<CourseAndSection[], Error>({
//     queryKey: [CACHE_KEY_ENROLLMENT, sectionId],
//     queryFn: getApiClient<CourseAndSection>(sectionId, "eligible-courses")
//       .getAll,
//     staleTime: ms("24h"),
//   });
// };

// export const useEnrollment = (studentId: number, enrollmentId: number) => {
//   return useQuery<Teach, Error>({
//     queryKey: [CACHE_KEY_ENROLLMENT, enrollmentId, studentId],
//     queryFn: () =>
//       getApiClient<Teach>(studentId, "enrollments").get(enrollmentId),
//   });
// };

// export const useCreateEnrollment = (
//   studentId: number,
//   onCreate: () => void,
//   reset: () => void
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation<EnrollmentCreateFormData, Error, EnrollmentCreateFormData>(
//     {
//       mutationFn: (data: EnrollmentCreateFormData) =>
//         getApiClient<EnrollmentCreateFormData>(studentId, TEACHE_URL).post(
//           data
//         ),

//       onSuccess: (existingData, newData) => {
//         onCreate();
//         reset();
//         return queryClient.invalidateQueries({
//           queryKey: [CACHE_KEY_ENROLLMENT],
//         });
//       },
//     }
//   );
// };

// export const useEditEnrollment = (studentId: number, onUpdate: () => void) => {
//   const queryClient = useQueryClient();

//   return useMutation<EnrollmentEditFormData, Error, EnrollmentEditFormData>({
//     mutationFn: (data: EnrollmentEditFormData) =>
//       getApiClient<EnrollmentEditFormData>(studentId, TEACHE_URL).patch(
//         data
//       ),

//     onSuccess: (existingData, newData) => {
//       onUpdate();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_ENROLLMENT],
//       });
//     },
//   });
// };

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
