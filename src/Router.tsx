import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./accounts/LoginPage";
import RegistrationPage from "./accounts/RegistrationPage";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import {
  AUTH_LAYOUT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SCH_YEAR_LIST_ROUTE,
} from "./data/constants";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SchoolYearDetailPage from "./pages/schoolYears/SchoolYearDetailPage";
import SchoolYearList from "./pages/schoolYears/SchoolYearList";

const router = createBrowserRouter([
  {
    path: AUTH_LAYOUT_ROUTE,
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      { path: REGISTER_ROUTE, element: <RegistrationPage /> },
      { path: SCH_YEAR_LIST_ROUTE, element: <SchoolYearList /> },
      { path: `${SCH_YEAR_LIST_ROUTE}/:id`, element: <SchoolYearDetailPage /> },
    ],
  },

  {
    path: HOME_ROUTE,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      { path: HOME_ROUTE, element: <HomePage /> },
      { path: LOGIN_ROUTE, element: <LoginPage /> },
    ],
  },
]);

export default router;
