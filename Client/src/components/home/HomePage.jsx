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

const HomePage = ({ setUserDetails, getRecommendedMovies, getHomeMovies }) => {
  const [moviesList, setMoviesList] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselDetails, setCarouselDetails] = useState([]);
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
      if (data.role === "admin") navigate("/admin/home");
      if (data.age) {
        navigate("/");
        const userId = {
          user_id: data?._id,
        };
        getRecommendedMovies(
          userId,
          setMoviesList,
          setIsLoading,
          setCarouselDetails
        );
      } else {
        navigate("/initialDetails");
      }
    } else if (user) {
      if (user.role === "admin") navigate("/admin/home");
      setIsLoggedIn(true);
      const userId = {
        user_id: user?._id,
      };
      getRecommendedMovies(
        userId,
        setMoviesList,
        setIsLoading,
        setCarouselDetails
      );
    } else {
      getHomeMovies(setMoviesList, setIsLoading, setCarouselDetails);
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
              {carouselDetails.map((item, index) => (
                <CarouselCard movieDetails={item} />
              ))}
            </Carousel>
          </Box>
          {Object.keys(moviesList).map((category) => (
            moviesList[category]?.data?.length!==0 ? 
            <Box sx={{ ml: 12, mr: 12 }}>
              <MainCard
                movieDetails={moviesList[category]?.data}
                heading={moviesList[category]?.title}
              />
            </Box> : <> </>
          ))}
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
