import React, { useEffect, useState } from "react";
import AdminMainCard from "./AdminMainCard";
import HomeNavbar from "../home/HomeNavbar";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAdminActions } from "../../app/actions/adminActions";
import { connect, useSelector } from "react-redux";

const AdminHomePage = ({ getAllMovies }) => {
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    if (!user || user?.role === "user") {
      navigate("/");
    } else if (user) {
      setIsLoggedIn(true);
    }

    getAllMovies(setMoviesList);
  }, []);

  const handleOpen = () => navigate("/admin/addMovie");
  return (
    <>
      <HomeNavbar isLoggedIn={isLoggedIn} />
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

const mapActionsToProps = (dispatch) => {
  return {
    ...getAdminActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(AdminHomePage);
