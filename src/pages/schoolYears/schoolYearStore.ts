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

interface UserQuery {
  userId?: number;
}
interface UserQueryStore {
  userQuery: UserQuery;
  setSelectedUserId: (userId: number) => void;
}

export const useUserStore = create<UserQueryStore>((set) => ({
  userQuery: {},
  setSelectedUserId: (userId) =>
    set((store) => ({
      userQuery: { ...store.userQuery, userId },
    })),
}));
