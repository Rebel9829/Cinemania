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
    getRecommendedMovies: (
      userDetails,
      setMoviesList,
      setIsLoading,
      setCarouselDetails
    ) =>
      dispatch(
        getRecommendedMovies(
          userDetails,
          setMoviesList,
          setIsLoading,
          setCarouselDetails
        )
      ),
    getHomeMovies: (setMoviesList, setIsLoading, setCarouselDetails) =>
      dispatch(getHomeMovies(setMoviesList, setIsLoading, setCarouselDetails)),
    getMovieDetails: (movieId, setMovieDetails, setMoviesList) =>
      dispatch(getMovieDetails(movieId, setMovieDetails, setMoviesList)),
    getIsFavouriteMovie: (movieId, setIsFavourite) =>
      dispatch(getIsFavouriteMovie(movieId, setIsFavourite)),
    getLikedMovies: (userId, setMoviesList) =>
      dispatch(getLikedMovies(userId, setMoviesList)),
    changeData: () => dispatch(changeData()),
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
      dispatch(changeData());
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
        dispatch(changeData());
      }
    }
  };
};

const addToPreviouslyWatched = (userDetails) => {
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
      if (success) {
        dispatch(changeData());
        const movieId = {
          movie_id: userDetails.movieId,
        };
        dispatch(incCount(movieId));
      }
    }
  };
};

// DataMind Calls

const getRecommendedMovies = (
  userId,
  setMoviesList,
  setIsLoading,
  setCarouselDetails
) => {
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
      const popularMovies = response?.data?.popular?.data;
      const randomElements = [];

      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * popularMovies?.length);
        const randomElement = popularMovies[randomIndex];
        randomElements.push(randomElement);
      }
      setCarouselDetails(randomElements);
    }
  };
};

const getHomeMovies = (setMoviesList, setIsLoading, setCarouselDetails) => {
  return async (dispatch) => {
    const response = await datamindCall({}, ENDPOINTS.GET_HOME_MOVIES, "GET");
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      setMoviesList(response?.data);
      setIsLoading(false);
      const popularMovies = response?.data?.popular_data?.data;
      const randomElements = [];

      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * popularMovies?.length);
        const randomElement = popularMovies[randomIndex];
        randomElements.push(randomElement);
      }
      setCarouselDetails(randomElements);
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
      dispatch(
        openAlertMessage("Some Error Occurred. Please try again later!")
      );
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

const getLikedMovies = (userId, setMoviesList) => {
  return async (dispatch) => {
    const response = await datamindCall(
      userId,
      ENDPOINTS.GET_LIKED_MOVIES,
      "POST"
    );
    if (response.error) {
      dispatch(openAlertMessage("Some Error Occurred!"));
    } else {
      setMoviesList(response?.data?.liked_movies?.data);
    }
  };
};

const changeData = () => {
  return async (dispatch) => {
    const response = await datamindCall({}, ENDPOINTS.CHANGE_DATA, "GET");
    console.log("response", response);
    if (!response) {
      dispatch(openAlertMessage("Some error occurred"));
    } else {
    }
  };
};

const incCount = (movieId) => {
  return async (dispatch) => {
    const response = await datamindCall(
      movieId,
      ENDPOINTS.INCREASE_COUNT,
      "POST"
    );
    console.log("response", response);
    if (response.error) {
      dispatch(openAlertMessage("Some error occurred"));
    } else {
      const { success } = response?.data;
    }
  };
};
