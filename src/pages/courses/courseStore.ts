import { create } from "zustand";

interface CourseQuery {
    departmentId?: number;
    removeAllFilters?: string;
  }

  interface CourseQueryStore {
    courseQuery: CourseQuery;
    setSelectedDepartmentId: (departmentId: number) => void;
    setRemoveAllFilters: (str: string) => void;
  }
  
  export const useCourseStore = create<CourseQueryStore>((set) => ({
    courseQuery: {},
    setRemoveAllFilters: (removeAllFilters) =>
      set(() => ({ courseQuery: { removeAllFilters } })),
    setSelectedDepartmentId: (departmentId) =>
      set((store) => ({
        courseQuery: { ...store.courseQuery, departmentId },
      })),
  }));
  
  