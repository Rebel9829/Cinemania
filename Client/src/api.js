import axios from "axios";
import { BASE_URL } from "./constants/AppConstants";
import { Logout } from "./shared/utils/Logout";
import { store } from ".";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const { userDetails } = store.getState().auth;
    console.log("userDetails", userDetails);

    if (userDetails) {
      const token = userDetails.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiCall = async (data, endpoint, method) => {
  try {
    if (method === "GET") {
      return await apiClient.get(endpoint, data);
    } else if (method === "POST") {
      console.log("endpoint", endpoint);
      return await apiClient.post(endpoint, data);
    }
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
