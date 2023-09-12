import * as api from "../../api";
import { openAlertMessage } from "./alertActions";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

export const getAuthActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
    requestPasswordReset: (userDetails, navigate) =>
      dispatch(requestPasswordReset(userDetails, navigate)),
    passwordReset: (userDetails, navigate) =>
      dispatch(passwordReset(userDetails, navigate)),
    setUserDetails: (userDetails) =>
      dispatch(requestPasswordReset(userDetails)),
  };
};

export const login = (userDetails, navigate) => {
  return async (dispatch) => {
    console.log(userDetails);
    const response = await api.login(userDetails);
    if (response.error) {
      console.log("response", response);
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      console.log(userDetails);
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
      navigate("/");
    }
  };
};

export const register = (userDetails, navigate) => {
  return async (dispatch) => {
    console.log(userDetails);
    const response = await api.register(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
      navigate("/");
    }
  };
};

export const requestPasswordReset = (userDetails, setMailStatus) => {
  return async (dispatch) => {
    console.log("userDetails", userDetails);
    const response = await api.requestPasswordReset(userDetails);
    console.log(response);
    if (response.status !== 200) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      setMailStatus(true);
    }
  };
};

export const passwordReset = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.passwordReset(userDetails);
    if (response.status !== 200) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Password updated successfully"));
      navigate("/");
    }
  };
};
