import { Box, Card, CardContent, CardMedia, Typography, styled } from "@mui/material";
import React from "react";

const CastCard = () => {
    const label = { inputProps: { "aria-label": "Switch demo" } };
    const useStyles = styled({
        root: {
            maxWidth: 310,
            transition: "transform 0.15s ease-in-out",
        },
        cardHovered: {
            transform: "scale3d(1.05, 1.05, 1)",
        },
    });
    const classes = useStyles();
    const [state, setState] = React.useState({
        raised: false,
        shadow: 1,
    });
    return (
        <>
            <Card
                sx={{ margin: 2, width: 140 }}
                classes={{ root: state.raised ? classes.cardHovered : "" }}
                onMouseOver={() => setState({ raised: true, shadow: 3 })}
                onMouseOut={() => setState({ raised: false, shadow: 1 })}
                raised={state.raised}
                zdepth={state.shadow}
            >
                <Box position="relative">
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="175"
                        image="https://source.unsplash.com/random"
                    />
                    <CardContent style={{padding: "12px 0 0 0", height: "80px" }}>
                        <Typography variant="h6" align="center" sx={{fontSize: "1.1em", fontWeight: "bold"}}>Vin Diesel</Typography>
                        <Typography variant="h6" align="center" sx={{fontSize: "0.9em"}}>Baby Groot (voice)</Typography>
                    </CardContent>
                </Box>
            </Card>
        </>
    )
}

export default CastCard;