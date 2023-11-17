import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import apiClient from "../services/httpService";
import { SimpleCourse } from "./useCourses";
import { SimpleSection } from "./useSections";
import { SimpleSemester } from "./useSemesters";
import { SimpleStudent } from "./useStudents";
import { SimpleSchoolYear } from "./useSchoolYears";
import { CACHE_KEY_ENROLLMENT } from "../cacheKeysAndRoutes";
import { EnrollmentCreateFormData } from "../pages/enrollments/EnrollmentCreateForm";

interface CourseAndSection {
  id: number;
  code: string;
  sections: SimpleSection[];
}

export interface Enrollment {
  id: number;
  student: SimpleStudent;
  semester: SimpleSemester;
  course: SimpleCourse;
  section: SimpleSection;
  school_year: SimpleSchoolYear;
  status: string;
  date: string;
}

const getApiClient = <T>(studentId: number, childEndPoint: string) => {
  const BASE_URL = "/school/students";
  const ENROLLMENT_URL = `${BASE_URL}/${studentId}/${childEndPoint}/`;
  const apiClients = apiClient<T>(ENROLLMENT_URL);

  return apiClients;
};

const ENROLLMENTS_URL = "enrollments";

export const useEnrollments = (sectionId: number) => {
  return useQuery<Enrollment[], Error>({
    queryKey: [CACHE_KEY_ENROLLMENT],
    queryFn: getApiClient<Enrollment>(sectionId, ENROLLMENTS_URL).getAll,
    staleTime: ms("24h"),
  });
};

export const useEnrollmentCourses = (sectionId: number) => {
  return useQuery<CourseAndSection[], Error>({
    queryKey: [CACHE_KEY_ENROLLMENT],
    queryFn: getApiClient<CourseAndSection>(sectionId, "eligible-courses").getAll,
    staleTime: ms("24h"),
  });
};

// export const useEnrollment = (studentId: number, attendanceId: number) => {
//   return useQuery<Enrollment, Error>({
//     queryKey: [CACHE_KEY_ENROLLMENT, attendanceId],
//     queryFn: () => getApiClient<>(studentId, 'eligible-courses').get(attendanceId),
//   });
// };

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
          queryKey: [CACHE_KEY_ENROLLMENT],
        });
      },
    }
  );
};

// export const useEditAttendance = (onUpdate: () => void) => {
//   const queryClient = useQueryClient();

//   return useMutation<AttendanceEditFormData, Error, AttendanceEditFormData>({
//     mutationFn: (data: AttendanceEditFormData) =>
//       apiClients.patch<AttendanceEditFormData>(data),

//     onSuccess: (existingData, newData) => {
//       onUpdate();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_ATTENDANCE],
//       });
//     },
//   });
// };

// export const useDeleteAttendance = (onDelete: () => void) => {
//   const navigate = useNavigate();

//   const queryClient = useQueryClient();
//   return useMutation<number, Error, number>({
//     mutationFn: (id: number) => getApiClient().delete(id),

//     onSuccess: (existingData, newData) => {
//       navigate(`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}`);
//       onDelete();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_ATTENDANCE],
//       });
//     },
//   });
// };
