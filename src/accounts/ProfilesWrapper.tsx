import { useEmployeeProfile } from "../hooks/useEmployees";
import { useTeacherProfile } from "../hooks/useTeachers";
import AccessDenyPage from "../pages/AccessDenyPage";
import getUserId from "./../Utilities/getUserId";
import EmployeeProfilePage from "./employees/EmployeeProfilePage";
import TeacherProfilePage from "./teachers/TeacherProfilePage";

const ProfilesWrapper = () => {
  const userId = getUserId();
  const { data: employee } = useEmployeeProfile(userId!);
  const { data: teacher } = useTeacherProfile(userId!);

  const handleCurrentUserProfile = () => {
    let currentUser;
    if (employee && userId) {
      currentUser = employee.user.id === userId;
      if (currentUser) return <EmployeeProfilePage />;
    } else if (teacher && userId) {
      currentUser = teacher.user.id === userId;
      if (currentUser) return <TeacherProfilePage />;
    }return <AccessDenyPage />;
  };

  return handleCurrentUserProfile();
};

export default ProfilesWrapper;
