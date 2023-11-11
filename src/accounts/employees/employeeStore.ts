import { create } from "zustand";

interface EmployeeQuery {
  selectedDepartmentId?: number;
}

interface EmployeeQueryStore {
  employeeQuery: EmployeeQuery;
  setSelectedDepartmentId: (departmentId?: number) => void;
}

export const useEmployeeStore = create<EmployeeQueryStore>((set) => ({
  employeeQuery: {},
  setSelectedDepartmentId: (departmentId) =>
    set(() => ({
      employeeQuery: { selectedDepartmentId: departmentId },
    })),
}));
