import { create } from "zustand";

interface TeacherSectionQuery {
  selectedSectionId?: number;
}

interface TeacherSectionQueryStore {
  sectionQuery: TeacherSectionQuery;
  setSelectedSectionId: (sectionId: number) => void;
}

export const useTeacherSectionStore = create<TeacherSectionQueryStore>((set) => ({
  sectionQuery: {},
  setSelectedSectionId: (selectedSectionId) =>
    set(() => ({
      sectionQuery: { selectedSectionId },
    })),
}));
