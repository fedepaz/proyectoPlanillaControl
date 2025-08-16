import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Cliente específico para autenticación
const authClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Siempre envía cookies
  timeout: 10000,
});

// Interceptor para manejo de errores de autenticación
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido - limpiar estado local
      sessionStorage.removeItem("user_session_backup");
      localStorage.removeItem("user_session_backup");
      // Redirigir al login si es necesario
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default authClient;
