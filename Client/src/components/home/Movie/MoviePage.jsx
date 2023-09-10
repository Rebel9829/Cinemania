import React, { useState } from "react";
import HomeNavbar from "../HomeNavbar";
import Cast from "./Cast";
import { useLocation } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CircularProgress, Typography, Box } from '@mui/material';

const MoviePage = () => {
    const location = useLocation();
    const [movieData, setMovieData] = useState(location.state?.data);
    console.log(movieData);
    return (
        <div style={{ backgroundColor: "white" }}>
            <HomeNavbar />
            <div style={{
                display: "flex",
                padding: "30px 40px",
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3)), url(${movieData.backgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
            }}>
                <div>
                    <img src={movieData.imgUrl} alt={movieData.name} style={{ width: "300px", height: "450px" }} />
                </div>
                <div style={{ padding: "40px 10px 40px 40px" }}>
                    <Typography variant="h5" sx={{ color: "white", fontFamily: "'Source Sans Pro', Arial, sans-serif", fontSize: "35.2px", fontWeight: "bold" }}>{movieData.name}</Typography>
                    <Typography variant="h5" sx={{ color: "white", fontFamily: "'Source Sans Pro', Arial, sans-serif", fontSize: "16px" }}>Animation, Comedy, Family, Sci-Fi & Fantasy</Typography>
                    <div style={{ display: "flex" }}>
                        <Box position="relative" sx={{ mt: 3, ml: 1 }} display="inline-flex">
                            <CircularProgress
                                variant="determinate"
                                value={79}
                                size={55}
                                thickness={3}
                                sx={{ color: '#44cf69', border: "4px solid #05031a", backgroundColor: "#05031a", borderRadius: "100%" }}
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
                                <Typography variant="h5" style={{ color: "white", fontWeight: "bold" }} component="div" color="textSecondary">
                                    {79}<sup style={{ fontSize: "10px" }}>%</sup>
                                </Typography>
                            </Box>
                        </Box>
                        <div>
                            <Box position="relative" sx={{ mt: 3.5, ml: 2 }} display="inline-flex">
                                <div style={{ display: "flex", justifyContent: "center", width: "45px", height: "45px", borderRadius: "100%", backgroundColor: "#05031a" }}><FavoriteIcon sx={{ color: "white", marginTop: "13px", fontSize: "18px" }} /> </div>
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
                                '&:hover': {
                                    color: '#97dedb',
                                },
                            }}
                        >
                            <div style={{ display: "flex" }}>
                                <PlayArrowIcon sx={{ fontSize: "30px", mr: 1 }} /> Play Trailer
                            </div>
                        </Box>
                    </div>
                    <Box sx={{ mt: 3, ml: 1, color: "#97dedb" }}>
                        <Typography variant="h5" sx={{fontSize: "1.2em", fontStyle: "italic"}}>A hero of few words returns.</Typography>
                    </Box>
                    <Box sx={{ mt: 2, ml: 1, color: "white" }}>
                        <Typography variant="h5" sx={{fontSize: "1.4em"}}>Overview</Typography>
                    </Box>
                    <Box sx={{ mt: 1.3, ml: 1, color: "white" }}>
                        <Typography variant="h5" sx={{fontSize: "0.9em"}}>There's no guarding the galaxy from this mischievous toddler! Get ready as Baby Groot takes center stage in his very own collection of shorts, exploring his glory days growing up and getting into trouble among the stars.</Typography> 
                    </Box>
                    <Box sx={{ mt: 2, ml: 1, color: "white" }}>
                        <Typography variant="h5" sx={{fontSize: "1.25em", fontWeight: "bold"}}>Kirsten Lepore</Typography>
                    </Box>
                    <Box sx={{ mt: 0, ml: 1, color: "white" }}>
                        <Typography variant="h5" sx={{fontSize: "1em"}}>Creator</Typography> 
                    </Box>
                </div>
            </div>
            <Cast />
        </div>
    )
}

export default MoviePage;