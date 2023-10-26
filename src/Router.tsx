import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./accounts/LoginPage";
import RegistrationForm from "./accounts/RegistrationForm";
import AuthLayout from "./components/AuthLayout";
import UnAuthLayout from "./components/UnAuthLayout";
import {
  AUTH_LAYOUT_ROUTE,
  COURSES_CREATE_ROUTE,
  COURSES_LIST_ROUTE,
  GROUP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SCH_YEAR_LIST_ROUTE,
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
      { path: `${COURSES_LIST_ROUTE}/:pk`, element: <CourseDetailPage /> },
      { path: COURSES_CREATE_ROUTE, element: <CourseCreateForm /> },
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
