import { create } from "zustand";

interface EnrollmentQuery {
  selectedStudentId?: number;
}

interface StudentEnrollmentQueryStore {
  studentEnrollmentQuery: EnrollmentQuery;
  setSelectedStudentId: (studentId: number) => void;
}

export const useStudentEnrollmentStore = create<StudentEnrollmentQueryStore>((set) => ({
  studentEnrollmentQuery: {},
  setSelectedStudentId: (selectedStudentId) =>
    set(() => ({
      studentEnrollmentQuery: { selectedStudentId },
    })),
}));
