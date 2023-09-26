import { apiCall, datamindCall } from "../../api";
import { ENDPOINTS } from "../../constants/AppConstants";
import { openAlertMessage } from "./alertActions";
import { setUserDetails } from "./authActions";

export const mainActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getMainActions = (dispatch) => {
  return {
    addInitialDetails: (userDetails, navigate) =>
      dispatch(addInitialDetails(userDetails, navigate)),
    addToFavourites: (userDetails, setIsFavourite) =>
      dispatch(addToFavourites(userDetails, setIsFavourite)),
    addToPreviouslyWatched: (userDetails, setIsFavourite) =>
      dispatch(addToPreviouslyWatched(userDetails, setIsFavourite)),
    getRecommendedMovies: (userDetails, setMoviesList) =>
      dispatch(getRecommendedMovies(userDetails, setMoviesList)),
  };
};

const addInitialDetails = (userDetails, navigate) => {
  // console.log("userDetails", userDetails);
  return async (dispatch) => {
    const response = await apiCall(
      userDetails,
      ENDPOINTS.ADD_INITIAL_DETAILS,
      "POST"
    );
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      if (userDetails.age) {
        navigate("/");
      } else {
        navigate("/initialDetails");
      }
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
    }
  };
};

const addToFavourites = (userDetails, setIsFavourite) => {
  return async (dispatch) => {
    const response = await apiCall(
      userDetails,
      ENDPOINTS.ADD_TO_FAVOURITES,
      "POST"
    );
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { success } = response?.data;
      if (success) setIsFavourite(true);
    }
  };
};

const addToPreviouslyWatched = (userDetails) => {
  console.log("userDetails", userDetails);
  return async (dispatch) => {
    const response = await apiCall(
      userDetails,
      ENDPOINTS.ADD_TO_PREVIOUSLY_WATCHED,
      "POST"
    );
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { success } = response?.data;
    }
  };
};

// DataMind Calls

const getRecommendedMovies = (userDetails, setMoviesList) => {
  console.log("userDetails", userDetails);
  return async (dispatch) => {
    const response = await datamindCall(
      userDetails,
      ENDPOINTS.GET_RECOMMENDED_MOVIES,
      "POST"
    );
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      setMoviesList(response);
    }
  };
};
