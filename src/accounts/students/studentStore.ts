import { create } from "zustand";

interface StudentQuery {
  removeAllFilters?: string;
  searchText?: string;
  departmentId?: number;
  majorId?: number;
}

interface StudentQueryStore {
  studentQuery: StudentQuery;
  setRemoveAllFilters: (str: string) => void;
  setSearchText: (searchText: string) => void;
  setSelectedDepartmentId: (departmentId: number) => void;
  setSelectedMajorId: (majorId: number) => void;
}

export const useStudentStore = create<StudentQueryStore>((set) => ({
  studentQuery: {},
  setRemoveAllFilters: (removeAllFilters) =>
    set(() => ({ studentQuery: { removeAllFilters } })),
  setSearchText: (searchText) => set(() => ({ studentQuery: { searchText } })),
  setSelectedDepartmentId: (departmentId) =>
    set((store) => ({
      studentQuery: { ...store.studentQuery, departmentId },
    })),
  setSelectedMajorId: (majorId) =>
    set((store) => ({
      studentQuery: { ...store.studentQuery, majorId },
    })),
}));
