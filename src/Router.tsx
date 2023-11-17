import { createBrowserRouter } from "react-router-dom";
import GroupDetailPage from "./GroupsAndPermissions/GroupDetailPage";
import GroupListPage from "./GroupsAndPermissions/GroupList";
import LoginPage from "./accounts/LoginPage";
import ProfilesWrapper from "./accounts/ProfilesWrapper";
import RegistrationForm from "./accounts/RegistrationForm";
import EmployeeDetailPage from "./accounts/employees/EmployeeDetailPage";
import EmployeeListPage from "./accounts/employees/EmployeeListPage";
import EmployeeRegistrationForm from "./accounts/employees/EmployeeRegistrationForm";
import TeacherDetailPage from "./accounts/teachers/TeacherDetailPage";
import TeacherRegistrationForm from "./accounts/teachers/TeacherRegistrationForm";
import TeacherListPage from "./accounts/teachers/TeachersListPage";
import {
  ATTENDANCES_ROUTE,
  AUTH_LAYOUT_ROUTE,
  BUILDINGS_CREATE_ROUTE,
  BUILDINGS_ROUTE,
  CLASSROOMS_CREATE_ROUTE,
  CLASSROOMS_ROUTE,
  CLASSTIMES_CREATE_ROUTE,
  CLASSTIMES_ROUTE,
  COURSES_CREATE_ROUTE,
  COURSES_LIST_ROUTE,
  DEPARTMENTS_ROUTE,
  DEPARTMENT_CREATE_ROUTE,
  EMPLOYEES_ROUTE,
  EMPLOYEE_REGISTER_ROUTE,
  ENROLLMENTS_CREATE_ROUTE,
  ENROLLMENTS_ROUTE,
  GROUP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MAJORS_CREATE_ROUTE,
  MAJORS_ROUTE,
  OFFICES_CREATE_ROUTE,
  OFFICES_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SCH_YEAR_LIST_ROUTE,
  SECTIONS_CREATE_ROUTE,
  SECTIONS_ROUTE,
  SEMESTERS_ROUTE,
  SEMESTER_CREATE_ROUTE,
  STUDENTS_ROUTE,
  STUDENT_REGISTER_ROUTE,
  TEACHERS_ROUTE,
  TEACHER_REGISTER_ROUTE,
  USER_ROUTE,
} from "./cacheKeysAndRoutes";
import AuthLayout from "./components/AuthLayout";
import UnAuthHomePage from "./components/UnAuthHomePage";
import UnAuthLayout from "./components/UnAuthLayout";
import ErrorPage from "./pages/ErrorPage";
import BuildingCreateForm from "./pages/buildings/BuildingCreateForm";
import BuildingDetailPage from "./pages/buildings/BuildingDetailPage";
import BuildingListPage from "./pages/buildings/BuildingListPage";
import CourseCreateForm from "./pages/courses/CourseCreateForm";
import CourseDetailPage from "./pages/courses/CourseDetailPage";
import CourseListPage from "./pages/courses/CourseListPage";
import DepartmentCreateForm from "./pages/departments/DepartmentCreateForm";
import DepartmentDetailPage from "./pages/departments/DepartmentDetailPage";
import DepartmentListPage from "./pages/departments/DepartmentListPage";
import OfficeCreateForm from "./pages/offices/OfficeCreateForm";
import OfficeDetailPage from "./pages/offices/OfficeDetailPage";
import OfficeListPage from "./pages/offices/OfficeListPage";
import SchoolYearDetailPage from "./pages/schoolYears/SchoolYearDetailPage";
import SchoolYearList from "./pages/schoolYears/SchoolYearList";
import SemesterCreateForm from "./pages/semesters/SemesterCreateForm";
import SemesterDetailPage from "./pages/semesters/SemesterDetailPage";
import SemesterListPage from "./pages/semesters/SemesterListPage";
import UserDetailPage from "./pages/users/UserDetailPage";
import UsersListPage from "./pages/users/UsersListPage";
import MajorListPage from "./pages/majors/MajorListPage";
import MajorCreateForm from "./pages/majors/MajorCreateForm";
import MajorDetailPage from "./pages/majors/MajorDetailPage";
import StudentListPage from "./accounts/students/StudentListPage";
import StudentDetailPage from "./accounts/students/StudentDetailPage";
import StudentRegistrationForm from "./accounts/students/StudentRegistrationForm";
import ClassroomListPage from "./pages/classrooms/ClassroomListPage";
import ClassroomCreateForm from "./pages/classrooms/ClassroomCreateForm";
import ClassroomDetailPage from "./pages/classrooms/ClassroomDetailPage";
import ClasstimeListPage from "./pages/classtimes/ClasstimeListPage";
import ClasstimeDetailPage from "./pages/classtimes/ClasstimeDetailPage";
import ClasstimeCreateForm from "./pages/classtimes/ClasstimeCreateForm";
import SectionListPage from "./pages/sections/SectionListPage";
import SectionCreateForm from "./pages/sections/SectionCreateForm";
import SectionDetailPage from "./pages/sections/SectionDetailPage";
import AttendanceListPage from "./pages/attendances/AttendanceListPage";
import EnrollmentListPage from "./pages/enrollments/EnrollmentListPage";
import EnrollmentCreateForm from "./pages/enrollments/EnrollmentCreateForm";

const router = createBrowserRouter([
  {
    path: AUTH_LAYOUT_ROUTE,
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      { path: USER_ROUTE, element: <UsersListPage /> },
      { path: `${USER_ROUTE}/:pk`, element: <UserDetailPage /> },
      { path: PROFILE_ROUTE, element: <ProfilesWrapper /> },
      { path: EMPLOYEE_REGISTER_ROUTE, element: <EmployeeRegistrationForm /> },
      { path: EMPLOYEES_ROUTE, element: <EmployeeListPage /> },
      { path: `${EMPLOYEES_ROUTE}/:id/`, element: <EmployeeDetailPage /> },
      { path: TEACHERS_ROUTE, element: <TeacherListPage /> },
      { path: `${TEACHERS_ROUTE}/:id/`, element: <TeacherDetailPage /> },
      { path: TEACHER_REGISTER_ROUTE, element: <TeacherRegistrationForm /> },
      { path: STUDENTS_ROUTE, element: <StudentListPage /> },
      { path: `${STUDENTS_ROUTE}/:id/`, element: <StudentDetailPage /> },
      { path: STUDENT_REGISTER_ROUTE, element: <StudentRegistrationForm /> },
      { path: GROUP_ROUTE, element: <GroupListPage /> },
      { path: `${GROUP_ROUTE}/:id`, element: <GroupDetailPage /> },
      { path: REGISTER_ROUTE, element: <RegistrationForm /> },
      { path: SCH_YEAR_LIST_ROUTE, element: <SchoolYearList /> },
      { path: `${SCH_YEAR_LIST_ROUTE}/:id`, element: <SchoolYearDetailPage /> },
      { path: COURSES_LIST_ROUTE, element: <CourseListPage /> },
      { path: `${COURSES_LIST_ROUTE}/:pk/`, element: <CourseDetailPage /> },
      { path: COURSES_CREATE_ROUTE, element: <CourseCreateForm /> },
      { path: MAJORS_ROUTE, element: <MajorListPage /> },
      { path: MAJORS_CREATE_ROUTE, element: <MajorCreateForm /> },
      { path: `${MAJORS_ROUTE}/:id/`, element: <MajorDetailPage /> },
      { path: DEPARTMENTS_ROUTE, element: <DepartmentListPage /> },
      { path: `${DEPARTMENTS_ROUTE}/:pk/`, element: <DepartmentDetailPage /> },
      { path: DEPARTMENT_CREATE_ROUTE, element: <DepartmentCreateForm /> },
      { path: SEMESTERS_ROUTE, element: <SemesterListPage /> },
      { path: `${SEMESTERS_ROUTE}/:id/`, element: <SemesterDetailPage /> },
      { path: SEMESTER_CREATE_ROUTE, element: <SemesterCreateForm /> },
      { path: BUILDINGS_ROUTE, element: <BuildingListPage /> },
      { path: `${BUILDINGS_ROUTE}/:id/`, element: <BuildingDetailPage /> },
      { path: BUILDINGS_CREATE_ROUTE, element: <BuildingCreateForm /> },
      { path: OFFICES_ROUTE, element: <OfficeListPage /> },
      { path: `${OFFICES_ROUTE}/:id/`, element: <OfficeDetailPage /> },
      { path: OFFICES_CREATE_ROUTE, element: <OfficeCreateForm /> },
      { path: CLASSROOMS_ROUTE, element: <ClassroomListPage /> },
      { path: CLASSROOMS_CREATE_ROUTE, element: <ClassroomCreateForm /> },
      { path: `${CLASSROOMS_ROUTE}/:id/`, element: <ClassroomDetailPage /> },
      { path: CLASSTIMES_ROUTE, element: <ClasstimeListPage /> },
      { path: `${CLASSTIMES_ROUTE}/:id/`, element: <ClasstimeDetailPage /> },
      { path: CLASSTIMES_CREATE_ROUTE, element: <ClasstimeCreateForm /> },
      { path: SECTIONS_ROUTE, element: <SectionListPage /> },
      { path: SECTIONS_CREATE_ROUTE, element: <SectionCreateForm /> },
      { path: `${SECTIONS_ROUTE}/:id/`, element: <SectionDetailPage /> },
      {
        path: `${ATTENDANCES_ROUTE}/:sectionId/`,
        element: <AttendanceListPage />,
      },
      {
        path: `${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/:studentId/${ENROLLMENTS_ROUTE}/`,
        element: <EnrollmentListPage />,
      },
      {
        path: `${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/:studentId/${ENROLLMENTS_CREATE_ROUTE}/`,
        element: <EnrollmentCreateForm />,
      },
    ],
  },

  {
    path: HOME_ROUTE,
    errorElement: <UnAuthLayout children={<ErrorPage />} />,
    element: <UnAuthLayout />,
    children: [
      { path: HOME_ROUTE, element: <UnAuthHomePage /> },
      { path: LOGIN_ROUTE, element: <LoginPage /> },
    ],
  },
]);

export default router;
