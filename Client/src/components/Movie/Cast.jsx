import { Box, Typography } from "@mui/material";
import React from "react";
import CastCard from "./CastCard";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from "react-responsive-carousel";

const Cast = () => {
    const movieDetails = [{ name: "n1" }, { name: "n2" }, { name: "n3" }, { name: "n1" }, { name: "n2" }, { name: "n3" },{ name: "n1" }, { name: "n2" }, { name: "n3" }];
    const chunkSize = 7;

    // Function to chunk the movieDetails array into smaller arrays
    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    const castChunks = chunkArray(movieDetails, chunkSize);
    return (
        <Box sx={{ ml: 13, mr: 13, mt: 3, mb: 2 }}>
            <Typography variant="h5" sx={{ fontSize: "1.4em", fontWeight: "bold" }}>Series Cast</Typography>
            <Box sx={{ ml: -2 }}>
                <Carousel showStatus={false} infiniteLoop={true}>
                    {castChunks.map((chunk, index) => (
                        <div key={index} style={{ display: "flex" }}>
                            {chunk.map((movie, i) => (
                                <CastCard key={i} />
                            ))}
                        </div>
                    ))}
                </Carousel>
            </Box>
        </Box>
    )
}

export default Cast;