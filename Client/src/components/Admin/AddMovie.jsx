import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import {
  directorNames,
  writerNames,
  actorNames,
  genreNames,
} from "../../shared/utils/data";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getAdminActions } from "../../app/actions/adminActions";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const AddMovie = ({ addMovie }) => {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState("");
  const [director, setDirector] = useState("");
  const [otherDirectorValue, setOtherDirectorValue] = useState("");
  const [writer, setWriter] = useState("");
  const [cast, setcast] = useState("");
  const [trailer, setTrailer] = useState("");
  const [count, setCount] = useState("");
  const [otherWriterValue, setOtherWriterValue] = useState("");
  const [rating, setRating] = useState("");
  const [aRated, setARated] = useState("");
  const [country, setCountry] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState(null);
  const [runTime, setRunTime] = useState(null);
  const [otherWriter, setOtherWriter] = useState(false);
  const [otherDirector, setOtherDirector] = useState(false);
  const [otherGenre, setOtherGenre] = useState(false);
  const [languages, setLanguages] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [selectedPosterImage, setSelectedPosterImage] = useState(null);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);

  const handlePosterImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPosterImage({
          file,
          previewUrl: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedBackgroundImage({
          file,
          previewUrl: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePosterImageDeselect = () => {
    setSelectedPosterImage(null);
  };

  const handleBackgroundImageDeselect = () => {
    setSelectedBackgroundImage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const movieDetails = {
      movie_title: movieTitle,
      overview: description,
      genre: genres,
      release_date: releaseYear,
      runtime: runTime,
      director: director,
      writer: writer,
      cast: cast,
      tagline: tagline,
      poster_image: selectedPosterImage,
      background_image: selectedBackgroundImage,
      language: languages,
      country: country,
      rating: rating,
      A_rated: aRated,
      trailer: trailer,
      count: count,
    };
    console.log("movieDetails", movieDetails);
    addMovie(movieDetails, navigate);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "black" }}>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              my: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              padding: 4, // Add padding for spacing
              borderRadius: 1, // Set border radius for rounded corners
              boxShadow: 5,
            }}
          >
            <Typography component="h1" variant="h5">
              Please Enter Movie Details
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <input
                        accept="image/*"
                        id="movie-poster-upload"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handlePosterImageSelect}
                      />
                      <label htmlFor="movie-poster-upload">
                        <Paper
                          elevation={3}
                          style={{
                            padding: "16px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          component="div"
                        >
                          {selectedPosterImage ? (
                            <div>
                              <img
                                src={selectedPosterImage.previewUrl}
                                alt="Movie Poster"
                                style={{ maxWidth: "100%", maxHeight: "200px" }}
                              />
                              <Typography variant="caption">
                                {selectedPosterImage.file.name}
                              </Typography>
                              <IconButton
                                color="error"
                                aria-label="Deselect"
                                onClick={handlePosterImageDeselect}
                              >
                                <CancelIcon />
                              </IconButton>
                            </div>
                          ) : (
                            <Typography variant="body1">
                              Select a Movie Poster
                            </Typography>
                          )}
                        </Paper>
                      </label>
                    </Grid>
                    <Grid item xs={6}>
                      <input
                        accept="image/*"
                        id="movie-background-upload"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleBackgroundImageSelect}
                      />
                      <label htmlFor="movie-background-upload">
                        <Paper
                          elevation={3}
                          style={{
                            padding: "16px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          component="div"
                        >
                          {selectedBackgroundImage ? (
                            <div>
                              <img
                                src={selectedBackgroundImage.previewUrl}
                                alt="Movie Poster"
                                style={{ maxWidth: "100%", maxHeight: "200px" }}
                              />
                              <Typography variant="caption">
                                {selectedBackgroundImage.file.name}
                              </Typography>
                              <IconButton
                                color="error"
                                aria-label="Deselect"
                                onClick={handleBackgroundImageDeselect}
                              >
                                <CancelIcon />
                              </IconButton>
                            </div>
                          ) : (
                            <Typography variant="body1">
                              Select a Movie Background
                            </Typography>
                          )}
                        </Paper>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="movieTitle"
                        label="Movie Title"
                        type="text"
                        name="movieTitle"
                        autoComplete="Movie Title"
                        onChange={(e) => setMovieTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="releaseYear"
                        label="Release Year"
                        type="number"
                        name="releaseYear"
                        autoComplete="Release Year"
                        onChange={(e) => setReleaseYear(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="runTime"
                        label="Run Time (Minutes)"
                        type="number"
                        name="runTime"
                        autoComplete="Run Time"
                        onChange={(e) => setRunTime(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        type="text"
                        name="country"
                        autoComplete="Country"
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="description"
                    label="Description"
                    type="text"
                    name="description"
                    autoComplete="Description"
                    onChange={(e) => e.target.value}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Autocomplete
                        required
                        disablePortal
                        id="director"
                        options={directorNames}
                        value={director}
                        onChange={(e, val) => {
                          if (val === "Other") {
                            setOtherDirector(true);
                          } else {
                            setOtherDirector(false);
                          }
                          setDirector(val);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Director" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Autocomplete
                        required
                        disablePortal
                        id="writer"
                        options={writerNames}
                        value={writer}
                        onChange={(e, val) => {
                          if (val === "Other") {
                            setOtherWriter(true);
                          } else {
                            setOtherWriter(false);
                          }
                          setWriter(val);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Writer" />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        sx={{ display: otherDirector ? "auto" : "none" }}
                        required
                        fullWidth
                        id="otherDirector"
                        label="Other Director"
                        type="text"
                        name="otherDirector"
                        autoComplete="Other Director"
                        onChange={(e) => setOtherDirectorValue(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        sx={{ display: otherWriter ? "auto" : "none" }}
                        required
                        fullWidth
                        id="otherWriter"
                        label="Other Writer"
                        type="number"
                        name="otherWriter"
                        autoComplete="Other Writer"
                        onChange={(e) => setOtherWriterValue(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="rating"
                        label="Rating (out of 10)"
                        type="text"
                        name="rating"
                        autoComplete="Rating"
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>A Rated</InputLabel>
                        <Select
                          required
                          label="A Rated"
                          value={aRated}
                          onChange={(e) => setARated(e.target.value)}
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="tagline"
                    label="TagLine"
                    type="text"
                    name="tagline"
                    autoComplete="Writer"
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="languages"
                    value={languages}
                    onChange={(event, newValue) => {
                      setLanguages(newValue);
                    }}
                    options={names}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Languages"
                        placeholder="Add Your Language"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    value={genres}
                    onChange={(event, newValue) => {
                      setGenres(newValue);
                    }}
                    options={genreNames}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Genres"
                        placeholder="Add Favourite Genre"
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Details
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAdminActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(AddMovie);
