import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getMainActions } from "../../app/actions/mainActions";
import HomeNavbar from "../../components/home/HomeNavbar";
import LikedMainCard from "../../components/Movie/LikedMainCard";
import { useLocation, useParams } from "react-router-dom";

const SearchMoviesPage = () => {
  const location = useLocation();
  const { searchedValue } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([]);

  const user = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    if (user) setIsLoggedIn(true);
    setMoviesList(location.state.data);
  }, [searchedValue]);

  return (
    <>
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <LikedMainCard
        movieDetails={moviesList}
        heading={`Result for: ${searchedValue}`}
      />
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getMainActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(SearchMoviesPage);
