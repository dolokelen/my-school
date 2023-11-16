import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_ATTENDANCE } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { SimpleCourse } from "./useCourses";
import { SimpleSection } from "./useSections";
import { SimpleSemester } from "./useSemesters";
import { SimpleStudent } from "./useStudents";

export interface Attendance {
  id: number;
  student: SimpleStudent;
  semester: SimpleSemester;
  course: SimpleCourse;
  section: SimpleSection;
  school_year: { id: number; year: string };
  mark: string;
  comment: string;
  created_at: string;
}

const getApiClient = (sectionId: number) => {
  const SECTION_URL = `/school/sections/${sectionId}/attendances/`;
  const apiClients = apiClient<Attendance>(SECTION_URL);

  return apiClients;
};

export const useAttendances = (sectionId: number) => {
  return useQuery<Attendance[], Error>({
    queryKey: [CACHE_KEY_ATTENDANCE],
    queryFn: getApiClient(sectionId).getAll,
    staleTime: ms("24h"),
  });
};

export const useAttendance = (sectionId: number, attendanceId: number) => {
  return useQuery<Attendance, Error>({
    queryKey: [CACHE_KEY_ATTENDANCE, attendanceId],
    queryFn: () => getApiClient(sectionId).get(attendanceId),
  });
};

// export const useCreateAttendance = (onCreate: () => void, reset: () => void) => {
//   const apiClients = apiClient<AttendanceCreateFormData>(SECTION_URL);

//   const queryClient = useQueryClient();

//   return useMutation<AttendanceCreateFormData, Error, AttendanceCreateFormData>({
//     mutationFn: (data: AttendanceCreateFormData) => apiClients.post(data),

//     onSuccess: (existingData, newData) => {
//       onCreate();
//       reset();
//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_ATTENDANCE],
//       });
//     },
//   });
// };

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
