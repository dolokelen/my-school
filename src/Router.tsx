import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import SchoolYearCreateForm from "./pages/schoolYears/SchoolYearCreateForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {index: true, element: <HomePage />},
            {path: 'school-year-create-form', element: <SchoolYearCreateForm/>}
        ]
    }
]);

export default router;