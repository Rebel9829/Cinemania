import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import MoviesCard from "./MoviesCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const MainCard = ({ movieDetails, heading }) => {
  const chunkSize = 5;

  // Function to chunk the movieDetails array into smaller arrays
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const movieChunks = chunkArray(movieDetails, chunkSize);

  return (
    <Box sx={{ ml: 14, mr: 14 }}>
      <Typography variant="h5" sx={{ color: "white", mt: 3, ml: 4, fontFamily: "Roboto", fontWeight: "500", fontSize: "1.4em" }}>{heading}</Typography>
      <Box sx={{ mr: 2, ml: 2, mb: 2, mt: 0, backgroundColor: "#00050D" }}>
        <Carousel showStatus={false} infiniteLoop={true}>
          {movieChunks.map((chunk, index) => (
            <div key={index} style={{display: "flex"}}>
              {chunk.map((movie, i) => (
                <MoviesCard item={movie} key={i} />
              ))}
            </div>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default MainCard;
