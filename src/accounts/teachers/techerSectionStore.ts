import { create } from "zustand";

interface TeacherSectionQuery {
  selectedSectionId?: number;
  selectedCourseId?: number;
}

interface TeacherSectionQueryStore {
  sectionQuery: TeacherSectionQuery;
  setSelectedSectionId: (courseId: number, sectionId: number) => void;
}

export const useTeacherSectionStore = create<TeacherSectionQueryStore>((set) => ({
  sectionQuery: {},
  setSelectedSectionId: (selectedCourseId, selectedSectionId) =>
    set(() => ({
      sectionQuery: { selectedCourseId, selectedSectionId },
    })),
}));
