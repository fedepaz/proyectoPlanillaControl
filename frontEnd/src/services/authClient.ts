import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

authClient.interceptors.response.use(
  (response) => {
    console.log("response recibida en interceptor", response);
    console.log("cookies recibidas en interceptor", document.cookie);
    return response;
  },
  (error) => {
    console.log("error recibida en interceptor", error);
    console.log("cookies recibidas en interceptor", document.cookie);
    if (error.response?.status === 401) {
      try {
        sessionStorage.removeItem("user_session_backup");
        localStorage.removeItem("user_session_backup");
        sessionStorage.removeItem("user_backup");
        localStorage.removeItem("user_backup");
        document.cookie = "ios_user_backup=; path=/; max-age=0";
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
