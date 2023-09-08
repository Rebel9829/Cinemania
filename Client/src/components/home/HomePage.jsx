import React, { useState } from "react";
// import HomeNavbar from "./HomeNavbar";
import MainCard from './MainCard';

const HomePage = () => {
    const [moviesList, setMoviesList] = useState([]);

    const ChunkedMoviesList = () => {
        const chunkArray = (array, showingCount) => {
            const chunks = [];
            for (let i = 0; i < array.length; i += showingCount) {
                chunks.push(array.slice(i, i + showingCount))
            }
            return chunks;
        };

        const moviesChunks = chunkArray(moviesList, 5);

        return (
            <>
                {moviesChunks.map((chunk, index) => (
                    <MainCard key={index} movieDetails={chunk} />
                ))}
            </>
        );
    };

    return (
        <div>
            <p style={{ color: "white" }}>Hello</p>
        </div>
    )
}

export default HomePage;