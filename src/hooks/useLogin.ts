import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../accounts/LoginPage";
import { HOME_ROUTE } from "../data/constants";
import getUserId from "../data/getUserId";
import { axiosInstance } from "../services/httpService";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await axiosInstance.post("/auth/jwt/create", data);
      if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        const userId = getUserId();
        navigate(`${HOME_ROUTE}?userId=${userId}`);
        console.log("useLogin Id", userId);
      } else {
        setError("An unknown error has occured.");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) setError(axiosError.message);
    }
  };

  return { handleLogin, error };
};
