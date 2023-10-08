import { createBrowserRouter } from "react-router-dom";
import { HOME_ROUTE, SCH_YEAR_LIST_ROUTE } from "./data/constants";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import SchoolYearDetailPage from "./pages/schoolYears/SchoolYearDetailPage";
import SchoolYearList from "./pages/schoolYears/SchoolYearList";

const router = createBrowserRouter([
    {
        path: HOME_ROUTE,
        errorElement: <ErrorPage />,
        element: <Layout />,
        children:[
            // {index: true, element: <HomePage />},
            {path: SCH_YEAR_LIST_ROUTE, element: <SchoolYearList/>},
            {path: `${SCH_YEAR_LIST_ROUTE}/:id`, element: <SchoolYearDetailPage />}
        ]
    }
]);

export default router;