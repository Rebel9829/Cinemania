import React, { useEffect, useState } from "react";
import MainCard from "./MainCard";
import LikedMainCard from "./LikedMainCard";
import HomeNavbar from "../home/HomeNavbar";
import { connect, useSelector } from "react-redux";
import { getMainActions } from "../../app/actions/mainActions";

const LikedMovies = ({ getLikedMovies }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([
    {
      name: "PK",
      imgUrl: "https://source.unsplash.com/random",
      backgroundImg: "https://source.unsplash.com/random",
      content: "This is test content.",
    },
    {
      name: "Fast and Furious 1",
      backgroundImg: "https://source.unsplash.com/random",
      imgUrl: "https://source.unsplash.com/random",
      content: "This is test content.",
    },
    {
      name: "Fast and Furious 2",
      backgroundImg: "https://source.unsplash.com/random",
      imgUrl: "https://source.unsplash.com/random",
      content: "This is test content.",
    },
    {
      name: "Fast and Furious 3",
      backgroundImg: "https://source.unsplash.com/random",
      imgUrl: "https://source.unsplash.com/random",
      content: "This is test content.",
    },
    {
      name: "Fast and Furious 4",
      backgroundImg: "https://source.unsplash.com/random",
      imgUrl: "https://source.unsplash.com/random",
      content: "This is test content.",
    },
    {
      name: "Fast and Furious 5",
      backgroundImg: "https://source.unsplash.com/random",
      imgUrl: "https://source.unsplash.com/random",
      content: "This is test content.",
    },
  ]);
  const user = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    if (user) setIsLoggedIn(true);
    const userId = {
      user_id: user._id,
    };
    getLikedMovies(userId, setMoviesList);
  }, []);

  return (
    <>
      <HomeNavbar isLoggedIn={isLoggedIn} />
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
