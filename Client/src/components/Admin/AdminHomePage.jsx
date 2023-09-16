import React, { useState } from "react";
import AdminMainCard from "./AdminMainCard";
import HomeNavbar from "../home/HomeNavbar";
import AddTabs from "./AddTabs";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const AdminHomePage = () => {
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
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };
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
              // boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
            },
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Movie
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              backgroundColor: "black",
              color: "white",
              px: 2,
              py: 1,
            }}
            id="modal-modal-title"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" component="h2">
                Add Movie
              </Typography>
              <div>
                <IconButton
                  sx={{ color: "white" }}
                  aria-label="Delete"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          </Box>
          <AddTabs />
        </Box>
      </Modal>
      <AdminMainCard movieDetails={moviesList} heading="All Movies" />
    </>
  );
};

export default AdminHomePage;
