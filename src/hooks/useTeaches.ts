import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import apiClient from "../services/httpService";
import { SimpleSchoolYear } from "./useSchoolYears";
import { SimpleSection } from "./useSections";
import { SimpleSemester } from "./useSemesters";
import { SimpleTeacher } from "./useTeachers";
import { CACHE_KEY_TEACH } from "../cacheKeysAndRoutes";
import { CourseAndSection, SimpleCourse } from "./useCourses";
import { SimpleStudent } from "./useStudents";
import { Classtime } from "./useClasstimes";
import { Classroom } from "./useClassrooms";
import { SectionAssignmentFormData } from "../pages/teaches/SectionAssignmentForm";

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

interface TeacherSection {
  id: number;
  teacher: SimpleTeacher;
  course: SimpleCourse;
  section: SimpleSection;
  semester: SimpleSemester;
  school_year: SimpleSchoolYear;
  date: string;
}

const getApiClient = <T>(
  parentURL: string,
  teacherId: number,
  childEndPoint: string
) => {
  const ENROLLMENT_URL = `/school/${parentURL}/${teacherId}/${childEndPoint}/`;
  const apiClients = apiClient<T>(ENROLLMENT_URL);

  return apiClients;
};

const TEACHE_URL = "teaches";

export const useTeacherSections = (teacherId: number) => {
  return useQuery<TeacherSection[], Error>({
    queryKey: [teacherId],
    queryFn: getApiClient<TeacherSection>("teachers", teacherId, "sections").getAll,
    staleTime: ms("24h"),
  });
};

export const useTeacherSectionEnrollments = (teacherId: number) => {
  return useQuery<Teach[], Error>({
    queryKey: [CACHE_KEY_TEACH, teacherId],
    queryFn: getApiClient<Teach>("teachers", teacherId, TEACHE_URL).getAll,
    staleTime: ms("24h"),
  });
};

const SECTION_URL = "sections";

export const useTeacherSectionClasstime = (sectionId: number) => {
  return useQuery<Classtime[], Error>({
    queryKey: [CACHE_KEY_TEACH, sectionId],
    queryFn: getApiClient<Classtime>(SECTION_URL, sectionId, "classtime")
      .getAll,
    staleTime: ms("24h"),
  });
};

export const useTeacherSectionClassroom = (sectionId: number) => {
  return useQuery<Classroom[], Error>({
    queryKey: [CACHE_KEY_TEACH],
    queryFn: getApiClient<Classroom>(SECTION_URL, sectionId, "classroom")
      .getAll,
    staleTime: ms("24h"),
  });
};

export const useCurrentCoursesWithSections = () => {
  const endpoint = "/school/only-courses-with-sections/";

  const apiclients = apiClient<CourseAndSection>(endpoint);
  return useQuery<CourseAndSection[], Error>({
    queryKey: [CACHE_KEY_TEACH],
    queryFn: apiclients.getAll,
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

export const useSectionAssigment = (
  teacherId: number,
  onAssign: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation<
    SectionAssignmentFormData,
    Error,
    SectionAssignmentFormData
  >({
    mutationFn: (data: SectionAssignmentFormData) =>
      getApiClient<SectionAssignmentFormData>(
        "teachers",
        teacherId,
        TEACHE_URL
      ).post(data),

    onSuccess: (existingData, newData) => {
      onAssign();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_TEACH],
      });
    },
  });
};

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
