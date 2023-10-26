import { create } from "zustand";

interface CourseQuery {
  removeAllFilters?: string;
  searchText?: string;
  departmentId?: number;
  prerequisite?: number;
}

interface CourseQueryStore {
  courseQuery: CourseQuery;
  setRemoveAllFilters: (str: string) => void;
  setSearchText: (searchText: string) => void;
  setSelectedDepartmentId: (departmentId: number) => void;
  setSelectedPrerequisite: (prerequisite: number) => void;
}

export const useCourseStore = create<CourseQueryStore>((set) => ({
  courseQuery: {},
  setRemoveAllFilters: (removeAllFilters) =>
    set(() => ({ courseQuery: { removeAllFilters } })),
  setSearchText: (searchText) => set(() => ({ courseQuery: { searchText } })),
  setSelectedDepartmentId: (departmentId) =>
    set((store) => ({
      courseQuery: { ...store.courseQuery, departmentId },
    })),
  setSelectedPrerequisite: (prerequisite) =>
    set((store) => ({
      courseQuery: { ...store.courseQuery, prerequisite },
    })),
}));
