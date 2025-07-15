import axios from "axios";
import { API_BASE_URL } from "./constants";

const axiosinstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
axiosinstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosinstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const res = await axiosinstance.post("/auth/token/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("refreshToken", res.response.access);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${res.response.access}`;
        return axiosinstance(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosinstance;
