import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../accounts/LoginPage";
import { HOME_ROUTE } from "../data/constants";
import { axiosInstance } from "../services/httpService";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginFormData) => {
        try {
          const response = await axiosInstance.post("/auth/jwt/create/", data);
          if (response.data.access) {
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            axiosInstance.defaults.headers["Authorization"] =
              "JWT " + localStorage.getItem("access_token");
            navigate(HOME_ROUTE);
          } else {
            setError("Invalid credentials");
          }
        } catch (error) {
          console.log(error);
          setError("Kindly ensure that your username and password matched.");
        }
  };

  return { handleLogin, error };
};
