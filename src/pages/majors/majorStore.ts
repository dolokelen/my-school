import { create } from "zustand";

interface MajorQuery {
  selectedDepartmentId?: number;
}

interface MajorQueryStore {
  majorQuery: MajorQuery;
  setSelectedDepartmentId: (departmentId?: number) => void;
}

export const useMajorStore = create<MajorQueryStore>((set) => ({
  majorQuery: {},
  setSelectedDepartmentId: (departmentId) =>
    set(() => ({
      majorQuery: { selectedDepartmentId: departmentId },
    })),
}));
