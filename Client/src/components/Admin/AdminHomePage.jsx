import React, { useState } from "react";
import AdminMainCard from "./AdminMainCard";
import HomeNavbar from "../home/HomeNavbar";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();
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
  const handleOpen = () => navigate("/admin/addMovie");
  return (
    <>
      <HomeNavbar />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{
            transition: "transform 0s ease, box-shadow 0.3s ease",
            color: "#8fa8a6",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Movie
        </Button>
      </div>
      <AdminMainCard movieDetails={moviesList} heading="All Movies" />
    </>
  );
};

export default AdminHomePage;
