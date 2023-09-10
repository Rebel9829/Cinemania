import React, { useState } from "react";
import MainCard from './Movie/MainCard';
import HomeNavbar from "./HomeNavbar";

const HomePage = () => {
    const [moviesList, setMoviesList] = useState([{
        name: "PK",
        imgUrl: "https://source.unsplash.com/random",
        backgroundImg: "https://source.unsplash.com/random",
        content: "This is test content."
    }, {
        name: "Fast and Furious 1",
        backgroundImg: "https://source.unsplash.com/random",
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    },{
        name: "Fast and Furious 2",
        backgroundImg: "https://source.unsplash.com/random",
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    },{
        name: "Fast and Furious 3",
        backgroundImg: "https://source.unsplash.com/random",
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    }, {
        name: "Fast and Furious 4",
        backgroundImg: "https://source.unsplash.com/random",
        imgUrl: "https://source.unsplash.com/random",
        content: "This is test content."
    },{
        name: "Fast and Furious 5",
        backgroundImg: "https://source.unsplash.com/random",
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