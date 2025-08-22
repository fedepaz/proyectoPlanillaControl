import axios from "axios";

let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  csrfToken = token;
};

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    if (
      ["POST", "PUT", "PATCH", "DELETE"].includes(
        config.method?.toUpperCase() ?? ""
      )
    ) {
      if (csrfToken) {
        console.log("CSRF Token header:", csrfToken);
        config.headers["x-csrf-token"] = csrfToken;
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
