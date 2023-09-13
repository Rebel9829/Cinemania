import { Box, Typography } from "@mui/material";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

const Trailer = () => {
    return (
        <Box sx={style}>
            <Box sx={{ backgroundColor: "black", color: "white", px: 2, py: 1 }} id="modal-modal-title">
                <Typography variant="h6" component="h2">
                    Play Trailer
                </Typography>
            </Box>
            <Box id="modal-modal-description" sx={{mb: -0.4}}>
                <iframe width="1070" 
                height="600" 
                src="https://www.youtube.com/embed/c20XsM9BWEM?si=ifti1m_3zVYFBY1W" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen="allowfullscreen"></iframe>
            </Box>
        </Box>
    )
}

export default Trailer;