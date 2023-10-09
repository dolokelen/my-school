import { Navigate, Outlet } from "react-router-dom";
import { HOME_ROUTE } from "./data/constants";
import HomePage from "./pages/HomePage";

const PrivateRoutes = () => {
  const user = false;
  const user1 = { id: 1, username: "Dolokelen" };
  if (user1) return <HomePage />;

  return <Navigate to={HOME_ROUTE} />;
};

export default PrivateRoutes;
