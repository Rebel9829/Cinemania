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
    addToFavourites: (userDetails, setIsFavourite, isFavourite) =>
      dispatch(addToFavourites(userDetails, setIsFavourite, isFavourite)),
    addToPreviouslyWatched: (userDetails, setIsFavourite) =>
      dispatch(addToPreviouslyWatched(userDetails, setIsFavourite)),
    getRecommendedMovies: (userDetails, setMoviesList, setIsLoading) =>
      dispatch(getRecommendedMovies(userDetails, setMoviesList, setIsLoading)),
    getMovieDetails: (movieId, setMovieDetails, setMoviesList) =>
      dispatch(getMovieDetails(movieId, setMovieDetails, setMoviesList)),
    getIsFavouriteMovie: (movieId, setIsFavourite) =>
      dispatch(getIsFavouriteMovie(movieId, setIsFavourite)),
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

const addToFavourites = (userDetails, setIsFavourite, isFavourite) => {
  return async (dispatch) => {
    const response = await apiCall(
      userDetails,
      ENDPOINTS.ADD_TO_FAVOURITES,
      "POST"
    );
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { success } = response?.data;
      if (success) {
        setIsFavourite(!isFavourite);
      }
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
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { success } = response?.data;
    }
  };
};

// DataMind Calls

const getRecommendedMovies = (userId, setMoviesList, setIsLoading) => {
  return async (dispatch) => {
    const response = await datamindCall(
      userId,
      ENDPOINTS.GET_RECOMMENDED_MOVIES,
      "POST"
    );
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      setMoviesList(response?.data);
      setIsLoading(false);
    }
  };
};

const getMovieDetails = (movieId, setMovieData, setMoviesList) => {
  // console.log("userDetails", userDetails);
  return async (dispatch) => {
    const response = await datamindCall(
      movieId,
      ENDPOINTS.GET_MOVIE_DETAILS,
      "POST"
    );
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      setMovieData(response?.data?.movie_data[0]);
      setMoviesList(response?.data?.recommended);
      console.log(
        "response?.data?.movie_data[0]",
        response?.data?.movie_data[0]
      );
    }
  };
};

const getIsFavouriteMovie = (movieId, setIsFavourite) => {
  return async (dispatch) => {
    const response = await apiCall(movieId, ENDPOINTS.GET_IS_FAVOURITE, "POST");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response?.data?.movie_data[0]", response);
      setIsFavourite(response?.data?.isFavourite);
    }
  };
};
