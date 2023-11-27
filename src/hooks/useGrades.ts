import { useMutation, useQuery } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_GRADE } from "../cacheKeysAndRoutes";
import apiClient, { formDataConfig } from "./../services/httpService";
import { SimpleCourse } from "./useCourses";
import { SimpleSchoolYear } from "./useSchoolYears";
import { SimpleSection } from "./useSections";
import { SimpleSemester } from "./useSemesters";
import { SimpleStudent } from "./useStudents";

interface Grade {
  id: number;
  student: SimpleStudent;
  school_year: SimpleSchoolYear;
  semester: SimpleSemester;
  course: SimpleCourse;
  section: SimpleSection;
  attendance: number;
  assignment: number;
  quiz: number;
  midterm: number;
  project: number;
  final: number;
  grade_point: number;
  total_score: number;
  letter: string;
  graded_at: string;
}

const getApiClient = <T>(
  teacherId: number,
  teachId: number,
  childURL: string
) => {
  const GRADE_URL = `school/teachers/${teacherId}/teaches/${teachId}/${childURL}/`;
  const apiClients = apiClient<T>(GRADE_URL);

  return apiClients;
};

export const useSectionGrades = (teacherId: number, teachId: number) =>
  useQuery<Grade[], Error>({
    queryKey: [CACHE_KEY_GRADE],
    queryFn: getApiClient<Grade>(teacherId, teachId, "teach-grades").getAll,
    staleTime: ms("24h"),
  });

export const useUploadStudentGrade = (
  teacherId: number,
  teachId: number,
  onUpload: () => void
) => {
  return useMutation<FormData, Error, FormData>({
    mutationFn: (data: FormData) =>
      getApiClient<FormData>(teacherId, teachId, "grades").post(
        data,
        formDataConfig
      ),

    onSuccess: (existingData, newData) => {
      onUpload();
    },
  });
};
