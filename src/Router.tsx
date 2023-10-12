import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./accounts/LoginPage";
import RegistrationPage from "./accounts/RegistrationPage";
import AuthLayout from "./components/AuthLayout";
import UnAuthLayout from "./components/UnAuthLayout";
import {
  AUTH_LAYOUT_ROUTE,
  GROUP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SCH_YEAR_LIST_ROUTE,
} from "./data/constants";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SchoolYearDetailPage from "./pages/schoolYears/SchoolYearDetailPage";
import SchoolYearList from "./pages/schoolYears/SchoolYearList";
import GroupListPage from "./GroupsAndPermissions/GroupList";
import GroupDetailPage from "./GroupsAndPermissions/GroupDetailPage";

const router = createBrowserRouter([
  {
    path: AUTH_LAYOUT_ROUTE,
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      {path: GROUP_ROUTE, element: <GroupListPage />},
      {path: `${GROUP_ROUTE}/:id`, element: <GroupDetailPage />},
      { path: REGISTER_ROUTE, element: <RegistrationPage /> },
      { path: SCH_YEAR_LIST_ROUTE, element: <SchoolYearList /> },
      { path: `${SCH_YEAR_LIST_ROUTE}/:id`, element: <SchoolYearDetailPage /> },
    ],
  },

  {
    path: HOME_ROUTE,
    errorElement: <UnAuthLayout children={<ErrorPage />} />,
    element: <UnAuthLayout />,
    children: [
      { path: HOME_ROUTE, element: <HomePage /> },
      { path: LOGIN_ROUTE, element: <LoginPage /> },
    ],
  },
]);

export default router;
