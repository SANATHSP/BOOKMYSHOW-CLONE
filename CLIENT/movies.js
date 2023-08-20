import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-dir/api_help";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        variant="h4"
        margin={"auto"}
        padding={2}
        width="40%"
        bgcolor={"#B9EDC9"}
        color="#549E6B"
        textAlign="center"
      >
        {" "}
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin={"auto"}
        marginTop={5}
        display="flex"
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            ></MovieItem>
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
