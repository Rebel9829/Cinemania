import {
  Box,
  Card,
  styled,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminMoviesCard = ({ item }) => {
  const navigate = useNavigate();
  const iconButtonStyle = {
    position: "absolute",
    top: "-5px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    transition: "transform 0.2s ease-in-out",
  };

  const onIconButtonHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";
  };

  const onIconButtonLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };
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
    <div style={{ position: "relative" }}>
      <IconButton
        style={{ ...iconButtonStyle, left: "10px", zIndex: 1 }}
        color="primary"
        aria-label="Edit"
        onMouseEnter={onIconButtonHover}
        onMouseLeave={onIconButtonLeave}
      >
        <EditIcon sx={{ fontSize: "0.7em" }} />
      </IconButton>
      <IconButton
        style={{ ...iconButtonStyle, right: "10px", zIndex: 1 }}
        color="secondary"
        aria-label="Delete"
        onMouseEnter={onIconButtonHover}
        onMouseLeave={onIconButtonLeave}
      >
        <DeleteIcon sx={{ fontSize: "0.7em" }} />
      </IconButton>
      <Card
        sx={{ margin: 2, width: 226 }}
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
            height="127.13px"
            image={item.image}
            onClick={() =>
              navigate(`/movie/${item.name}`, { state: { data: item } })
            }
          />
          <Box sx={{ p: 1, pl: 2, backgroundColor: "#181818", color: "white", display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                fontFamily: "roboto",
                fontWeight: "bold",
                fontSize: "1.1em",
                fontStyle: "italic",
              }}
            >
              {item.name}
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default AdminMoviesCard;
