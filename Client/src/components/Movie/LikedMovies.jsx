import React, { useEffect, useState } from "react";
import LikedMainCard from "./LikedMainCard";
import HomeNavbar from "../home/HomeNavbar";
import { connect, useSelector } from "react-redux";
import { getMainActions } from "../../app/actions/mainActions";

const LikedMovies = ({ getLikedMovies }) => {
  const [moviesList, setMoviesList] = useState([]);
  const user = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    const userId = {
      user_id: user._id,
    };
    getLikedMovies(userId, setMoviesList);
  }, []);

  return (
    <>
      <HomeNavbar />
      <LikedMainCard movieDetails={moviesList} heading="Liked Movies" />
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getMainActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(LikedMovies);
