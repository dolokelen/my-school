import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import {
  CACHE_KEY_CLASSROOM,
  CACHE_KEY_CLASSTIME,
  CACHE_KEY_TEACH,
} from "../cacheKeysAndRoutes";
import { AssignSectionEditFormData } from "../pages/teaches/AssignedSectionEditFrom";
import { SectionAssignmentFormData } from "../pages/teaches/SectionAssignmentForm";
import apiClient from "../services/httpService";
import { Classroom } from "./useClassrooms";
import { Classtime } from "./useClasstimes";
import { CourseAndSection, SimpleCourse } from "./useCourses";
import { SimpleSchoolYear } from "./useSchoolYears";
import { SimpleSection } from "./useSections";
import { SimpleSemester } from "./useSemesters";
import { SimpleStudent } from "./useStudents";
import { SimpleTeacher } from "./useTeachers";

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
    queryFn: getApiClient<TeacherSection>("teachers", teacherId, "sections")
      .getAll,
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

const ENROLLMENT_UPDATE_URL = `/school/teach-update/`;
export const useEnrollment = (enrollmentId: number) => {
  const apiclients = apiClient<TeacherSection>(ENROLLMENT_UPDATE_URL);
  return useQuery<TeacherSection, Error>({
    queryKey: [enrollmentId],
    queryFn: () => apiclients.get(enrollmentId),
  });
};

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

export const useEditAssignSection = (onUpdate: () => void) => {
  const queryClient = useQueryClient();
  const apiClients = apiClient<AssignSectionEditFormData>(
    ENROLLMENT_UPDATE_URL
  );

  return useMutation<
    AssignSectionEditFormData,
    Error,
    AssignSectionEditFormData
  >({
    mutationFn: (data: AssignSectionEditFormData) => apiClients.patch(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_TEACH],
      });
    },
  });
};
