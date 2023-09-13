import React, { useEffect, useState } from "react";
import MainCard from "../Movie/MainCard";
import HomeNavbar from "./HomeNavbar";
import CarouselCard from "./CarouselCard";
import jwt_decode from "jwt-decode";
import { getAuthActions } from "../../app/actions/authActions";
import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../../shared/components/Navbar";
import { Logout } from "../../shared/utils/Logout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";

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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const user = useSelector((state) => state.auth.userDetails);
  const navigate = useNavigate();
  const search = useLocation().search;
  useEffect(() => {
    const token = new URLSearchParams(search).get("user");
    if (token) {
      const data = jwt_decode(token).user;
      setIsLoggedIn(true);
      setUserDetails(data);
      navigate("/");
    }
    console.log("home", user);
    if(user){
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <HomeNavbar isLoggedIn = {isLoggedIn} />
      <Box sx={{ mx: 16, my: 4 }}>
        <Carousel showStatus={false} infiniteLoop={true} autoPlay>
          <CarouselCard heading="Jailer" />
          <CarouselCard heading="Jawaan" />
          <CarouselCard heading="Fast And Furious" />
        </Carousel>
      </Box>
      <Box sx={{ ml: 12, mr: 12 }}><MainCard movieDetails={moviesList} heading="Recommended Movies" /></Box>
      <Box sx={{ ml: 12, mr: 12 }}><MainCard movieDetails={moviesList} heading="Top Rated Movies" /></Box>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuthActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(HomePage);
