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

interface EnrollmentIdQuery {
  enrollmentId?: number;
}

interface EnrollmentIdQueryStore {
  enrollmentIdQuery: EnrollmentIdQuery;
  setSelectedEnrollmentId: (enrollmentId: number) => void;
}

export const useEnrollmentIdStore = create<EnrollmentIdQueryStore>((set) => ({
  enrollmentIdQuery: {},
  setSelectedEnrollmentId: (enrollmentId) =>
    set(() => ({
      enrollmentIdQuery: { enrollmentId },
    })),
}));
