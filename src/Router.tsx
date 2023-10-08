import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SchoolYearCreateForm from "./pages/schoolYears/SchoolYearCreateForm";
import SchoolYearList from "./pages/schoolYears/SchoolYearList";
import SchoolYearDetailPage from "./pages/schoolYears/SchoolYearDetailPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <Layout />,
        children:[
            {index: true, element: <HomePage />},
            {path: 'school-years', element: <SchoolYearList/>},
            {path: 'school-years/:id', element: <SchoolYearDetailPage />}
        ]
    }
]);

export default router;