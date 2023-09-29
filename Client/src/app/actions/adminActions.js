import { datamindCall } from "../../api";
import { ENDPOINTS } from "../../constants/AppConstants";
import { openAlertMessage } from "./alertActions";

export const mainActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getAdminActions = (dispatch) => {
  return {
    getAllMovies: (setMoviesList) => dispatch(getAllMovies(setMoviesList)),
    addMovie: (movieDetails, navigate) =>
      dispatch(addMovie(movieDetails, navigate)),
  };
};

const getAllMovies = (setMoviesList) => {
  // console.log("userDetails", userDetails);
  return async (dispatch) => {
    const response = await datamindCall({}, ENDPOINTS.GET_ALL_MOVIES, "GET");
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      setMoviesList(response?.data?.all_movies);
    }
  };
};

const addMovie = (movieDetails, navigate) => {
  return async (dispatch) => {
    const response = await datamindCall(
      movieDetails,
      ENDPOINTS.ADD_MOVIE,
      "POST"
    );
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage("Some error occurred"));
    } else {
      navigate("/admin/home");
      dispatch(openAlertMessage("Movie added successfully."));
    }
  };
};
