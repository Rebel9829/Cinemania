import React, { useEffect, useState } from "react";
import MainCard from "../Movie/MainCard";
import HomeNavbar from "./HomeNavbar";
import CarouselCard from "./CarouselCard";
import jwt_decode from "jwt-decode";
import { getAuthActions } from "../../app/actions/authActions";
import { getMainActions } from "../../app/actions/mainActions";
import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";

const HomePage = ({ setUserDetails, getRecommendedMovies }) => {
  const [moviesList, setMoviesList] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.userDetails);
  const navigate = useNavigate();
  const search = useLocation().search;
  useEffect(() => {
    const userDetails = new URLSearchParams(search).get("user");
    if (userDetails) {
      const data = jwt_decode(userDetails).userDetails;
      console.log("data", data);
      setIsLoggedIn(true);
      setUserDetails(data);
      if (data.age) {
        navigate("/");
        const userId = {
          user_id: data?._id,
        };
        getRecommendedMovies(userId, setMoviesList, setIsLoading);
      } else {
        navigate("/initialDetails");
      }
    }
    else if (user) {
      setIsLoggedIn(true);
      const userId = {
        user_id: user?._id,
      };
      getRecommendedMovies(userId, setMoviesList, setIsLoading);
    }
    
  }, []);

  return (
    <>
      <HomeNavbar isLoggedIn={isLoggedIn} />
      {isLoading ? (
        <></>
      ) : (
        <>
          <Box sx={{ mx: 16, my: 4 }}>
            <Carousel showStatus={false} infiniteLoop={true} autoPlay>
              <CarouselCard heading="Jailer" />
              <CarouselCard heading="Jawaan" />
              <CarouselCard heading="Fast And Furious" />
            </Carousel>
          </Box>
          <Box sx={{ ml: 12, mr: 12 }}>
            <MainCard
              movieDetails={moviesList?.recommended_overall}
              heading="Recommended Movies"
            />
          </Box>
          <Box sx={{ ml: 12, mr: 12 }}>
            <MainCard
              movieDetails={moviesList?.recommended_genre}
              heading="Recommended By Genre"
            />
          </Box>
          <Box sx={{ ml: 12, mr: 12 }}>
            <MainCard
              movieDetails={moviesList?.recommended_cast}
              heading="Recommended By Cast"
            />
          </Box>
          <Box sx={{ ml: 12, mr: 12 }}>
            <MainCard
              movieDetails={moviesList?.popular}
              heading="Popular Now"
            />
          </Box>
          <Box sx={{ ml: 12, mr: 12 }}>
            <MainCard
              movieDetails={moviesList?.top_rated}
              heading="Top Rated Movies"
            />
          </Box>
        </>
      )}
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuthActions(dispatch),
    ...getMainActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(HomePage);
