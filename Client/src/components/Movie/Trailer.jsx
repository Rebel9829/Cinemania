import { Box } from "@mui/material";
import React from "react";

const Trailer = () => {
  return (
    <Box id="modal-modal-description" sx={{ mb: -0.5 }}>
      <iframe
        width="1070"
        height="600"
        src="https://www.youtube.com/embed/c20XsM9BWEM?si=ifti1m_3zVYFBY1W"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen="allowfullscreen"
      ></iframe>
    </Box>
  );
};

export default Trailer;
