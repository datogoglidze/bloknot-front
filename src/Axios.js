import axios from "axios";

let setGlobalError;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API || "http://localhost:8000",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status >= 400) {
      if (setGlobalError) {
        setGlobalError(error.response.data?.detail || "Something went wrong.");
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
