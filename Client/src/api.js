import axios from "axios";
import { BASE_URL } from "./constants/AppConstants";
import { Logout } from "./shared/utils/Logout";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Public Routes
export const login = async (data) => {
  try {
    console.log("data", data);
    return await apiClient.post("/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    console.log("data", data);
    return await apiClient.post("/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const requestPasswordReset = async (data) => {
  try {
    console.log("data", data);
    return await apiClient.post("/auth/requestPasswordReset", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const passwordReset = async (data) => {
  try {
    console.log("data", data);
    return await apiClient.post("/auth/passwordReset", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && Logout();
  }
};
