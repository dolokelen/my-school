import { create } from "zustand";

interface DepartmentContactQuery {
  departmentContactId?: number;
}

interface DepartmentContactQueryStore {
  departmentContactQuery: DepartmentContactQuery;
  setSelectedDepartmentContactId: (departmentContactId: number) => void;
}

export const useDepartmentContactStore = create<DepartmentContactQueryStore>((set) => ({
  departmentContactQuery: {},
  setSelectedDepartmentContactId: (departmentContactId) =>
    set(() => ({
      departmentContactQuery: { departmentContactId },
    })),
}));
