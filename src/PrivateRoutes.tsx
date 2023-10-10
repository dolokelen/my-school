import LoginPage from "./accounts/LoginPage";
import AuthLayout from "./components/AuthLayout";
import getUserId from "./data/getUserId";

const PrivateRoutes = () => {
  const authUserId = getUserId();
  console.log("PrivateRoutes", authUserId)
  const authUserIdd = undefined;
  if (authUserIdd) return <AuthLayout />;

  return <LoginPage />;
  // return <Navigate to={HOME_ROUTE} />;
};

export default PrivateRoutes;
