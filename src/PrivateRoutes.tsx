import { Navigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import { HOME_ROUTE } from "./data/constants";

const PrivateRoutes = () => {
  const user = false;
  const user1 = { id: 1, username: "Dolokelen" };
  if (user1) return <AuthLayout />;

  return <Navigate to={HOME_ROUTE} />;
};

export default PrivateRoutes;
