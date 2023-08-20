import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const labelStyle = { mt: 1, mb: 1, textAlign: "left" };

const AuthForm = ({ onSubmit, isAdmin }) => {
  // State to manage form inputs
  const [Inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to track whether the form is in signup mode
  const [isSignUp, setisSignUp] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ Inputs, signUpKey: isAdmin ? false : isSignUp });
  };
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignUp ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignItems={"left"}
        >
          {/* conditional rendering of username field */}
          {!isAdmin && isSignUp && (
            <>
              {" "}
              <FormLabel sx={labelStyle}>UserName</FormLabel>
              <TextField
                value={{ Inputs }.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />{" "}
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={{ Inputs }.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={{ Inputs }.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          />
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#FAC5EE" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignUp ? "SignUp" : "Login"}
          </Button>
          {/* Switch mode button */}
          {!isAdmin && (
            <Button
              onClick={() => setisSignUp(!isSignUp)}
              sx={{ mt: 2, borderRadius: 10 }}
              type="button"
              fullWidth
              variant="contained"
            >
              Switch {isSignUp ? "Sign In" : "Sign up"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
