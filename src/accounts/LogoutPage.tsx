import { Navigate } from "react-router-dom";
import { HOME_ROUTE } from "../data/constants";

const LogoutPage = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken) localStorage.removeItem("access_token");
  if (refreshToken) localStorage.removeItem("refresh_token");
  
  return <Navigate to={HOME_ROUTE} />
};

export default LogoutPage;
