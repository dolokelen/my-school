import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SchoolYearCreateForm from "./pages/schoolYears/SchoolYearCreateForm";
import SchoolYearList from "./pages/schoolYears/SchoolYearList";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {index: true, element: <HomePage />},
            {path: 'school-years', element: <SchoolYearList/>}
        ]
    }
]);

export default router;