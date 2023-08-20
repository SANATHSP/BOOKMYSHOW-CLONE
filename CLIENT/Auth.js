import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-dir/api_help";
import { userActions } from "../../store";
import AuthForm from "./AuthForm";

const Auth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Callback function when response is received
  const onResReceived = (data) => {
    console.log(data);
    // Dispatch Redux action to indicate user login
    dispatch(userActions.login());
    // Store user ID in local storage
    localStorage.setItem("userId", data.id);
    // Navigate to the home page
    navigate("/");
  };

  // Function to handle form submission
  const getData = (data) => {
    console.log(data);
    // call the api to send user authentication request
    sendUserAuthRequest(data.Inputs, data.signup)
      .then(onResReceived) // Handle the response
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* Render the authentication form */}
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
