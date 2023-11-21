import { create } from "zustand";

interface TeacherQuery {
  selectedDepartmentId?: number;
  selectedTeacherId?: number;
}

interface TeacherQueryStore {
  teacherQuery: TeacherQuery;
  setSelectedDepartmentId: (departmentId: number) => void;
}

export const useTeacherStore = create<TeacherQueryStore>((set) => ({
  teacherQuery: {},
  setSelectedDepartmentId: (selectedDepartmentId) =>
    set(() => ({
      teacherQuery: { selectedDepartmentId },
    })),
}));

interface TeacherIdQueryStore {
  teacherIdQuery: TeacherQuery;
  setSelectedTeacherId: (teacherId: number) => void;
}

export const useTeacherIdStore = create<TeacherIdQueryStore>((set) => ({
  teacherIdQuery: {},
  setSelectedTeacherId: (selectedTeacherId) =>
    set(() => ({
      teacherIdQuery: { selectedTeacherId },
    })),
}));
