import React from "react";
import { Box, Paper } from "@mui/material";
import MoviesCard from "";

const MainCard = ({ outfitDetails }) => {
  return (
    <Box>
      <Paper sx={{ display: "flex", m: 2 }}>
        {/* {outfitDetails &&
          outfitDetails.map((cloth, i) => <MoviesCard />)} */}
      </Paper>
    </Box>
  );
};

export default MainCard;