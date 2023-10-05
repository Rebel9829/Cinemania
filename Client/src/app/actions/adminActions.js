import { datamindCall } from "../../api";
import { ENDPOINTS } from "../../constants/AppConstants";
import { openAlertMessage } from "./alertActions";

export const mainActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getAdminActions = (dispatch) => {
  return {
    getAllMovies: (setMoviesList, setIsLoading) =>
      dispatch(getAllMovies(setMoviesList, setIsLoading)),
    addMovie: (movieDetails, navigate, setIsLoading) =>
      dispatch(addMovie(movieDetails, navigate, setIsLoading)),
    updateMovie: (movieDetails, navigate) =>
      dispatch(updateMovie(movieDetails, navigate)),
    deleteMovie: (movieDetails, setMoviesList) =>
      dispatch(deleteMovie(movieDetails, setMoviesList)),
  };
};

const getAllMovies = (setMoviesList, setIsLoading) => {
  return async (dispatch) => {
    const response = await datamindCall({}, ENDPOINTS.GET_ALL_MOVIES, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      setMoviesList(response?.data?.all_movies);
      setIsLoading(false);
    }
  };
};

const addMovie = (movieDetails, navigate, setIsLoading) => {
  return async (dispatch) => {
    const response = await datamindCall(
      movieDetails,
      ENDPOINTS.ADD_MOVIE,
      "POST"
    );
    if (response.error) {
      dispatch(openAlertMessage("Some error occurred"));
      setIsLoading(false);
    } else {
      navigate("/admin/home");
      dispatch(openAlertMessage("Movie added successfully."));
    }
  };
};

const updateMovie = (movieDetails, navigate) => {
  return async (dispatch) => {
    const response = await datamindCall(
      movieDetails,
      ENDPOINTS.UPDATE_MOVIE,
      "POST"
    );
    if (response.error) {
      dispatch(openAlertMessage("Some error occurred"));
    } else {
      navigate("/admin/home");
      dispatch(openAlertMessage("Movie updated successfully."));
    }
  };
};

const deleteMovie = (movieDetails, setMoviesList) => {
  return async (dispatch) => {
    const response = await datamindCall(
      movieDetails,
      ENDPOINTS.DELETE_MOVIE,
      "POST"
    );
    if (response.error) {
      dispatch(openAlertMessage("Some error occurred"));
    } else {
      setMoviesList(response?.data?.data);
      dispatch(openAlertMessage("Movie deleted successfully."));
    }
  };
};
