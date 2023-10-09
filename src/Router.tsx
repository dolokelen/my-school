import { createBrowserRouter } from "react-router-dom";
import { HOME_ROUTE, REGISTER_ROUTE, SCH_YEAR_LIST_ROUTE } from "./data/constants";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SchoolYearDetailPage from "./pages/schoolYears/SchoolYearDetailPage";
import SchoolYearList from "./pages/schoolYears/SchoolYearList";
import PrivateRoutes from "./PrivateRoutes";
import RegistrationPage from "./accounts/RegistrationPage";

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    errorElement: <ErrorPage />,
    element: <HomePage />,
    children: [
        {path: REGISTER_ROUTE, element: <RegistrationPage />}
      //   { path: SCH_YEAR_LIST_ROUTE, element: <SchoolYearList /> },
    //   { path: `${SCH_YEAR_LIST_ROUTE}/:id`, element: <SchoolYearDetailPage /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      { path: SCH_YEAR_LIST_ROUTE, element: <SchoolYearList /> },
      { path: `${SCH_YEAR_LIST_ROUTE}/:id`, element: <SchoolYearDetailPage /> },
    ],
  },
]);

export default router;
