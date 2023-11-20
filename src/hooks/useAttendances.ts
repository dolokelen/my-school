import { useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_ATTENDANCE } from "../cacheKeysAndRoutes";
import { AttendanceData } from "../pages/attendances/AttendanceCreateForm";
import apiClient from "../services/httpService";
import { SimpleCourse } from "./useCourses";
import { SimpleSchoolYear } from "./useSchoolYears";
import { SimpleSection } from "./useSections";
import { SimpleSemester } from "./useSemesters";
import { SimpleStudent } from "./useStudents";

export interface Attendance {
  id: number;
  student: SimpleStudent;
  semester: SimpleSemester;
  course: SimpleCourse;
  section: SimpleSection;
  school_year: SimpleSchoolYear;
  mark: string;
  comment: string;
  created_at: string;
}

const getApiClient = <T>(sectionId: number) => {
  const ATTENDANCE_URL = `/school/sections/${sectionId}/attendances/`;
  const apiClients = apiClient<T>(ATTENDANCE_URL);

  return apiClients;
};

export const useAttendances = (sectionId: number) => {
  return useQuery<Attendance[], Error>({
    queryKey: [CACHE_KEY_ATTENDANCE],
    queryFn: getApiClient<Attendance>(sectionId).getAll,
    staleTime: ms("24h"),
  });
};

export const useAttendance = (sectionId: number, attendanceId: number) => {
  return useQuery<Attendance, Error>({
    queryKey: [CACHE_KEY_ATTENDANCE, attendanceId, sectionId],
    queryFn: () => getApiClient<Attendance>(sectionId).get(attendanceId),
  });
};

export const useCreateAttendances = (
  sectionId: number,
  attendances: AttendanceData[],
  onCreateAll: () => void
) => {
  const queryClient = useQueryClient();
  const doCreateAttendances = async () => {
    try {
      await getApiClient(sectionId).post(attendances);
      onCreateAll();
      queryClient.invalidateQueries([CACHE_KEY_ATTENDANCE]);
    } catch (error) {
      throw error;
    }
  };
  return doCreateAttendances;
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
