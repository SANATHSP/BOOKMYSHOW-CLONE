import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Autocomplete,
  Toolbar,
  TextField,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { getAllMovies } from "../api-dir/api_help";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  // Fetch all movies when the component mounts
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  // Handle logout based on user/admin status
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  // Handle search bar change and navigate to booking if user is logged in
  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#E389B9" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon></MovieIcon>
          </IconButton>
        </Box>

        {/* search bar */}
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Movies"
              />
            )}
          />
        </Box>

        {/* Tabs for navigation */}
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />

            {/* Admin and User tabs */}
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/auth" label="User" />
              </>
            )}

            {/* User tabs */}
            {isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/user" label="Profile" />
                <Tab
                  onClick={() => logout(false)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
            {/* Admin tabs */}
            {isAdminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                <Tab
                  onClick={() => logout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
