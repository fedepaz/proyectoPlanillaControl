import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authClient = axios.create({
  baseURL: API_URL,
});

authClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      try {
        sessionStorage.removeItem("user_session_backup");
        localStorage.removeItem("user_session_backup");
        sessionStorage.removeItem("user_backup");
        localStorage.removeItem("user_backup");
        sessionStorage.removeItem("accessToken");
      } catch (e) {
        console.warn("Error al limpiar cookies", e);
      }
      const currentPath = window.location.pathname;
      if (
        !currentPath.includes("/login") &&
        !currentPath.includes("/register")
      ) {
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default authClient;
