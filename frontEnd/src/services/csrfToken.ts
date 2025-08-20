import axios from "axios";

let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  csrfToken = token;
};

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    if (
      ["POST", "PUT", "PATCH", "DELETE"].includes(
        config.method?.toUpperCase() ?? ""
      )
    ) {
      if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
      } else {
        console.warn("CSRF Token not found");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
