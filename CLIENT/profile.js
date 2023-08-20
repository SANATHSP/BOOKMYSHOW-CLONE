import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-dir/api_help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();

  // Fetch user bookings and details when the component mounts
  useEffect(() => {
    // Fetch user bookings
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    // Fetch user details
    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  // Log the bookings to the console
  console.log(bookings);

  // Handle deletion of a booking
  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box width={"100%"} display="flex">
      {/* User Profile Section */}
      <Box
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        width={"30%"}
        padding={3}
      >
        <AccountCircleIcon
          sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
        />
        <Typography
          padding={1}
          width={"auto"}
          borderRadius={6}
          border={"1px solid #ccc"}
          textAlign={"center"}
        >
          Name: {user ? user.name : "N/A"}
        </Typography>
        <Typography
          mt={1}
          padding={1}
          width={"auto"}
          borderRadius={6}
          border={"1px solid #ccc"}
          textAlign={"center"}
        >
          Email: {user ? user.email : "N/A"}
        </Typography>
      </Box>

      {/* Booking List Section */}
      {bookings.length > 0 && (
        <Box width={"70%"} display="flex" flexDirection={"column"}>
          <Typography
            variant="h3"
            fontFamily={"verdana"}
            textAlign="center"
            padding={2}
          >
            Bookings
          </Typography>
          <Box
            width="80%"
            margin={"auto"}
            display={"flex"}
            flexDirection={"column"}
          >
            <List>
              {bookings.map((booking, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#00d386",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                  key={booking._id}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Movie: {booking.movie.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Seat: {booking.seatNumber}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Date: {new Date(booking.date).toDateString()}
                  </ListItemText>
                  <IconButton
                    onClick={() => handleDelete(booking._id)}
                    color="error"
                  >
                    <DeleteForeverIcon color="red" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
