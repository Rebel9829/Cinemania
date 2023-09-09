import React, { useState } from "react";
import MainCard from './MainCard';
import HomeNavbar from "./HomeNavbar";

const HomePage = () => {
    const [moviesList, setMoviesList] = useState([{
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    }, {
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    },{
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    },{
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    }, {
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    },{
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    }]);

    return (
        <>
            <HomeNavbar />
            <MainCard movieDetails={moviesList} heading = "Recommended Movies" />
            <MainCard movieDetails={moviesList} heading = "Top Rated Movies" />
        </>
    )
}

export default HomePage;