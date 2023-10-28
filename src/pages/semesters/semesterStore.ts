import { create } from "zustand";

interface semesterQuery {
  semesterName?: string;
}

interface SemesterQueryStore {
  semesterQuery: semesterQuery;
  setOrdering: (name: string) => void;
}

export const useSemesterseStore = create<SemesterQueryStore>((set) => ({
  semesterQuery: {},
  setOrdering: (semesterName) =>
    set(() => ({ semesterQuery: { semesterName } })),
}));
