import { useEmployeeProfile } from "../hooks/useEmployees";
import { useStudentProfile } from "../hooks/useStudents";
import { useTeacherProfile } from "../hooks/useTeachers";
import getUserId from "./../Utilities/getUserId";
import EmployeeProfilePage from "./employees/EmployeeProfilePage";
import StudentProfilePage from "./students/StudentProfilePage";
import TeacherProfilePage from "./teachers/TeacherProfilePage";
import { useTeacherIdStore } from "./teachers/teacherStore";

const ProfilesWrapper = () => {
  const userId = getUserId();
  const { data: employee } = useEmployeeProfile(userId!);
  const { data: teacher } = useTeacherProfile(userId!);
  const { data: student } = useStudentProfile(userId!);
  const setSelectedTeacherId = useTeacherIdStore((s) => s.setSelectedTeacherId);

  const handleCurrentUserProfile = () => {
    let currentUser;
    if (employee && userId) {
      currentUser = employee.user.id === userId;
      if (currentUser) return <EmployeeProfilePage />;
    } else if (teacher && userId) {
      currentUser = teacher.user.id === userId;
      setSelectedTeacherId(teacher.user.id);
      if (currentUser) return <TeacherProfilePage />;
    } else if (student && userId) {
      currentUser = student.user.id === userId;
      if (currentUser) return <StudentProfilePage />;
    }
    return <></>;
  };

  return handleCurrentUserProfile();
};

export default ProfilesWrapper;
