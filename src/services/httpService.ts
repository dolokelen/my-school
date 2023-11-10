import axios, { AxiosRequestConfig } from "axios";
import ms from "ms";

const baseURL = "http://127.0.0.1:8000";
const timeout = ms("5s");
const accept = "application/json";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: {
    "Content-Type": "application/json",
    accept: accept,
  },
});

export const formDataConfig = {
  baseURL: baseURL,
  timeout: timeout,
  headers: { "Content-Type": "multipart/form-data", accept: accept },
};

const access_token = localStorage.getItem("access_token");
if (access_token) {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `JWT ${access_token}`;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `JWT ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;

    if (error.response === undefined) {
      // Network error or other issues
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token) {
        try {
          // Attempt to refresh the access token using the refresh token
          const refreshResponse = await axiosInstance.post(
            "/api/token/refresh/",
            {
              refresh: refresh_token,
            }
          );

          // If the token refresh is successful, update the access token and reattempt the original request
          const new_access_token = refreshResponse.data.access;
          localStorage.setItem("access_token", new_access_token);
          originalRequest.headers.Authorization = `JWT ${new_access_token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If token refresh fails, log the user out or handle the error as needed
          console.error("Token refresh failed:", refreshError);
          // Perform logout or other error handling here if necessary
          return Promise.reject(refreshError);
        }
      }
    }

    // Handle other response errors
    return Promise.reject(error);
  }
);

interface Data {
  id?: number;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  get = (id: number) => {
    return axiosInstance
      .get<T>(`${this.endpoint}${id}/`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  getUserProfile = () => {
    return axiosInstance
      .get<T>(`${this.endpoint}/`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  getEntity = (userId: number) => {
    return axiosInstance
      .get<T[]>(`${this.endpoint}${userId}/`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  post = (data: T, requestConfig?: AxiosRequestConfig) => {
    return axiosInstance
      .post<T>(this.endpoint, data, requestConfig)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  put = <T extends Data>(data: T) => {
    return axiosInstance
      .put<T>(`${this.endpoint}${data.id}/`, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  patch = <T extends Data>(data: T) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}${data.id}/`, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  patchFormData = <T>(data: T, id: number) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}${id}/`, data, formDataConfig)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  patchNested = <T extends Data>(
    data: T,
    childEndpoint: string,
    childObjId?: number
  ) => {
    return axiosInstance
      .patch<T>(
        `${this.endpoint}${data.id}/${childEndpoint}/${childObjId}/`,
        data
      )
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  patchJsonData = <T>(data: T, entityId: number) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}${entityId}/`, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  delete = (id: number) => {
    return axiosInstance
      .delete(`${this.endpoint}${id}/`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  deleteAll = async (ids: number[], onDeleteAll: () => void) => {
    try {
      const deletePromises = ids.map((id) => {
        return this.delete(id);
      });

      await Promise.all(deletePromises);

      onDeleteAll();
    } catch (error) {
      throw error;
    }
  };
}

const apiClient = <T>(endpoint: string) => new APIClient<T>(endpoint);

export default apiClient;
