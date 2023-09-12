import React, { useEffect, useState } from "react";
import MainCard from "./Movie/MainCard";
import jwt_decode from "jwt-decode";
import { getAuthActions } from "../../app/actions/authActions";
import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import Navbar from "../../shared/components/Navbar";
import { Logout } from "../../shared/utils/Logout";

const HomePage = ({ setUserDetails }) => {
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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const search = useLocation().search;
  console.log(user);
  useEffect(() => {
    const token = new URLSearchParams(search).get("user");
    if (token) {
      setUser(jwt_decode(token));
      setUserDetails(jwt_decode(token));
      navigate("/");
    }
  }, []);

  return (
    <>
      <HomeNavbar />
      <MainCard movieDetails={moviesList} heading="Recommended Movies" />
      <MainCard movieDetails={moviesList} heading="Top Rated Movies" />
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuthActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(HomePage);
