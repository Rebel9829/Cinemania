import React, { useState } from "react";
import HomeNavbar from "../home/HomeNavbar";
import Cast from "./Cast";
import Trailer from "./Trailer";
import Modal from "@mui/material/Modal";
import { useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MainCard from "./MainCard";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { CircularProgress, Typography, Box } from "@mui/material";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#05031a",
  },
}));

const MoviePage = () => {
  const location = useLocation();
  const [movieData, setMovieData] = useState(location.state?.data);
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div style={{ backgroundColor: "white" }}>
      <HomeNavbar />
      <div
        style={{
          display: "flex",
          padding: "30px 40px",
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3)), url(${movieData.backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <img
            src={movieData.imgUrl}
            alt={movieData.name}
            style={{ width: "300px", height: "450px" }}
          />
        </div>
        <div style={{ padding: "40px 10px 40px 40px" }}>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontFamily: "'Source Sans Pro', Arial, sans-serif",
              fontSize: "35.2px",
              fontWeight: "bold",
            }}
          >
            {movieData.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontFamily: "'Source Sans Pro', Arial, sans-serif",
              fontSize: "16px",
            }}
          >
            Animation, Comedy, Family, Sci-Fi & Fantasy
          </Typography>
          <div style={{ display: "flex" }}>
            <Box
              position="relative"
              sx={{ mt: 3, ml: 1 }}
              display="inline-flex"
            >
              <CircularProgress
                variant="determinate"
                value={79}
                size={55}
                thickness={3}
                sx={{
                  color: "#44cf69",
                  border: "4px solid #05031a",
                  backgroundColor: "#05031a",
                  borderRadius: "100%",
                }}
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="h5"
                  style={{ color: "white", fontWeight: "bold" }}
                  component="div"
                  color="textSecondary"
                >
                  {79}
                  <sup style={{ fontSize: "10px" }}>%</sup>
                </Typography>
              </Box>
            </Box>
            <div>
              <Box
                position="relative"
                sx={{ mt: 3.5, ml: 2, cursor: "pointer" }}
                display="inline-flex"
              >
                <BootstrapTooltip
                  title="Login to add this movie to your favourite list"
                  placement="bottom"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "45px",
                      height: "45px",
                      borderRadius: "100%",
                      backgroundColor: "#05031a",
                    }}
                  >
                    <FavoriteIcon
                      sx={{
                        color: "white",
                        marginTop: "13px",
                        fontSize: "18px",
                      }}
                    />{" "}
                  </div>
                </BootstrapTooltip>
              </Box>
            </div>
            <Box
              position="relative"
              sx={{
                mt: 4.3,
                ml: 2,
                color: "white",
                fontSize: "17px",
                fontWeight: "600",
                cursor: "pointer",
                "&:hover": {
                  color: "#97dedb",
                },
              }}
            >
              <div style={{ display: "flex" }} onClick={handleOpen}>
                <PlayArrowIcon sx={{ fontSize: "30px", mr: 1 }} /> Play Trailer
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Trailer />
              </Modal>
            </Box>
          </div>
          <Box sx={{ mt: 3, ml: 1, color: "#97dedb" }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "1.2em", fontStyle: "italic" }}
            >
              A hero of few words returns.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, ml: 1, color: "white" }}>
            <Typography variant="h5" sx={{ fontSize: "1.4em" }}>
              Overview
            </Typography>
          </Box>
          <Box sx={{ mt: 1.3, ml: 1, color: "white" }}>
            <Typography variant="h5" sx={{ fontSize: "0.9em" }}>
              There's no guarding the galaxy from this mischievous toddler! Get
              ready as Baby Groot takes center stage in his very own collection
              of shorts, exploring his glory days growing up and getting into
              trouble among the stars.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, ml: 1, color: "white" }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "1.25em", fontWeight: "bold" }}
            >
              Kirsten Lepore
            </Typography>
          </Box>
          <Box sx={{ mt: 0, ml: 1, color: "white" }}>
            <Typography variant="h5" sx={{ fontSize: "1em" }}>
              Creator
            </Typography>
          </Box>
        </div>
      </div>
      <Cast />
      <Box sx={{backgroundColor: "black", px: 12, pt: 0.5}}><MainCard movieDetails={moviesList} heading="Recommended Movies" /></Box>
    </div>
  );
};

export default MoviePage;
