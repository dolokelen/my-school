import { create } from "zustand";

interface TeacherQuery {
  selectedDepartmentId?: number;
}

interface TeacherQueryStore {
  teacherQuery: TeacherQuery;
  setSelectedDepartmentId: (departmentId?: number) => void;
}

export const useTeacherStore = create<TeacherQueryStore>((set) => ({
  teacherQuery: {},
  setSelectedDepartmentId: (departmentId) =>
    set(() => ({
      teacherQuery: { selectedDepartmentId: departmentId },
    })),
}));
