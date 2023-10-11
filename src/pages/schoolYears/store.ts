import { create } from "zustand";

interface SchoolYearQuery {
  schoolYearId?: number;
}

interface SchoolYearQueryStore {
  schoolYearQuery: SchoolYearQuery;
  setSchoolYear: (schoolYearId: number) => void;
}

export const useSchoolYearStore = create<SchoolYearQueryStore>((set) => ({
  schoolYearQuery: {},
  setSchoolYear: (schoolYearId) =>
    set((store) => ({
      schoolYearQuery: { ...store.schoolYearQuery, schoolYearId },
    })),
}));


