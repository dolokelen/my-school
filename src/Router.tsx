import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./accounts/LoginPage";
import RegistrationForm from "./accounts/RegistrationForm";
import AuthLayout from "./components/AuthLayout";
import UnAuthLayout from "./components/UnAuthLayout";
import {
  AUTH_LAYOUT_ROUTE,
  BUILDINGS_CREATE_ROUTE,
  BUILDINGS_ROUTE,
  COURSES_CREATE_ROUTE,
  COURSES_LIST_ROUTE,
  DEPARTMENTS_ROUTE,
  DEPARTMENT_CREATE_ROUTE,
  GROUP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SCH_YEAR_LIST_ROUTE,
  SEMESTERS_ROUTE,
  SEMESTER_CREATE_ROUTE,
  USER_ROUTE,
} from "./cacheKeysAndRoutes";
import ErrorPage from "./pages/ErrorPage";
import UnAuthHomePage from "./components/UnAuthHomePage";
import SchoolYearDetailPage from "./pages/schoolYears/SchoolYearDetailPage";
import SchoolYearList from "./pages/schoolYears/SchoolYearList";
import GroupListPage from "./GroupsAndPermissions/GroupList";
import GroupDetailPage from "./GroupsAndPermissions/GroupDetailPage";
import UsersListPage from "./pages/users/UsersListPage";
import UserDetailPage from "./pages/users/UserDetailPage";
import CourseListPage from "./pages/courses/CourseListPage";
import CourseDetailPage from "./pages/courses/CourseDetailPage";
import CourseCreateForm from "./pages/courses/CourseCreateForm";
import DepartmentListPage from "./pages/departments/DepartmentListPage";
import DepartmentDetailPage from "./pages/departments/DepartmentDetailPage";
import DepartmentCreateForm from "./pages/departments/DepartmentCreateForm";
import SemesterListPage from "./pages/semesters/SemesterListPage";
import SemesterDetailPage from "./pages/semesters/SemesterDetailPage";
import SemesterCreateForm from "./pages/semesters/SemesterCreateForm";
import BuildingListPage from "./pages/buildings/BuildingListPage";
import BuildingDetailPage from "./pages/buildings/BuildingDetailPage";
import BuildingCreateForm from "./pages/buildings/BuildingCreateForm";

const router = createBrowserRouter([
  {
    path: AUTH_LAYOUT_ROUTE,
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      { path: USER_ROUTE, element: <UsersListPage /> },
      { path: `${USER_ROUTE}/:pk`, element: <UserDetailPage /> },
      { path: GROUP_ROUTE, element: <GroupListPage /> },
      { path: `${GROUP_ROUTE}/:id`, element: <GroupDetailPage /> },
      { path: REGISTER_ROUTE, element: <RegistrationForm /> },
      { path: SCH_YEAR_LIST_ROUTE, element: <SchoolYearList /> },
      { path: `${SCH_YEAR_LIST_ROUTE}/:id`, element: <SchoolYearDetailPage /> },
      { path: COURSES_LIST_ROUTE, element: <CourseListPage /> },
      { path: `${COURSES_LIST_ROUTE}/:pk/`, element: <CourseDetailPage /> },
      { path: COURSES_CREATE_ROUTE, element: <CourseCreateForm /> },
      { path: DEPARTMENTS_ROUTE, element: <DepartmentListPage /> },
      { path: `${DEPARTMENTS_ROUTE}/:pk/`, element: <DepartmentDetailPage /> },
      { path: DEPARTMENT_CREATE_ROUTE, element: <DepartmentCreateForm /> },
      { path: SEMESTERS_ROUTE, element: <SemesterListPage /> },
      { path: `${SEMESTERS_ROUTE}/:id/`, element: <SemesterDetailPage /> },
      { path: SEMESTER_CREATE_ROUTE, element: <SemesterCreateForm /> },
      { path: BUILDINGS_ROUTE, element: <BuildingListPage /> },
      { path: `${BUILDINGS_ROUTE}/:id/`, element: <BuildingDetailPage /> },
      { path: BUILDINGS_CREATE_ROUTE, element: <BuildingCreateForm /> },
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
