import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-dir/api_help";
import MovieItem from "./Movies/MovieItem";

const Homepage = () => {
  const [movies, setMovies] = useState([]);

  // Fetch all movies when the component mounts
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  });
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin="auto" width="70%" height="50vh" padding={2}>
        <img
          src="https://www.pinkvilla.com/images/2023-03/1241349170_oppenheimer-review_1280*720.jpg"
          alt="oppenheimer"
          width="100%"
          height="100%"
        />
      </Box>

      {/* Latest Release Section */}
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign="center">
          Latest Release
        </Typography>
        <Box
          display="flex"
          width="80%"
          justifyContent="center"
          margin="auto"
          flexWrap="wrap"
        >
          {movies &&
            movies.slice(0, 4).map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              /> // each key is unique
            ))}
        </Box>

        {/* View All Movies Button */}
        <Box display="flex" padding={5} margin="auto">
          <Button
            LinkComponent={Link}
            to="/movies"
            variant="outlined"
            sx={{ margin: "auto", color: "#2b2d42" }}
          >
            View All Movies
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
