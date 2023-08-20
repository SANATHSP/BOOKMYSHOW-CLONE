import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAdminById } from "../api-dir/api_help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const AdminProfile = () => {
  const [admin, setAdmin] = useState();

  // Fetch admin details when the component mounts
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width={"100%"} display="flex">
      {/* Admin Profile Section */}
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
          mt={1}
          padding={1}
          width={"auto"}
          borderRadius={6}
          border={"1px solid #ccc"}
          textAlign={"center"}
        >
          Email: {admin ? admin.email : "N/A"}
        </Typography>
      </Box>

      {/* Added Movies Section */}
      {admin && admin.addedMovies.length > 0 && (
        <Box width={"70%"} display="flex" flexDirection={"column"}>
          <Typography
            variant="h3"
            fontFamily={"verdana"}
            textAlign="center"
            padding={2}
          >
            Added Movies To Book
          </Typography>
          <Box
            width="80%"
            margin={"auto"}
            display={"flex"}
            flexDirection={"column"}
          >
            <List>
              {admin.addedMovies.map((movie, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#00d386",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Movie: {movie.title}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdminProfile;
