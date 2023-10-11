import { useLocation } from "react-router-dom";
import { HOME_ROUTE } from "./constants";

const authRouteToHomeRoute = () => {
  const location = useLocation();
  let fullPath = location.pathname;
  fullPath = HOME_ROUTE;
  return fullPath;
};

export default authRouteToHomeRoute;
