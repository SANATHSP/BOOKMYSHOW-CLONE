import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminLoginRequest } from "../../api-dir/api_help";
import { adminActions } from "../../store";
import AuthForm from "../Auth/AuthForm";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);

    // Dispatch Redux action to indicate admin login
    dispatch(adminActions.login());
    // Store admin ID and token in local storage
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    // navigate to the home page
    navigate("/");
  };

  // function to handle form submission
  const getData = (data) => {
    console.log("Admin", data);
    // call the API to send admin login request
    sendAdminLoginRequest(data.Inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* render the authentication form for admin */}
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
