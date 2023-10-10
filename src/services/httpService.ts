import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 5000, //5 sec
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

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
      .then((res) => res.data);
  };

  get = (id: number) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(`${this.endpoint}/`, data).then((res) => res.data);
  };

  put = <T extends Data>(data: T) => {
    return axiosInstance
      .put<T>(`${this.endpoint}/${data.id}/`, data)
      .then((res) => res.data);
  };

  patch = <T extends Data>(data: T) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}/${data.id}/`, data)
      .then((res) => res.data);
  };

  delete = (id: number) => {
    return axiosInstance
      .delete(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

const apiClient = <T>(endpoint: string) => new APIClient<T>(endpoint);

export default apiClient;
