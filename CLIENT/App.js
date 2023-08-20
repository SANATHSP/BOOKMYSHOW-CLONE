// import React from 'react';

import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import Homepage from "./components/Homepage";
import Movies from "./components/Movies/movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./store";
import { useEffect } from "react";
import Booking from "./components/Bookings/booking";
import UserProfile from "./profile/profile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./profile/AdminProfile";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isAdminLoggedIn, "isAdminLoggedIn");
  console.log(isUserLoggedIn, "isUserLoggedIn");

  // Dispatch login action based on local storage data
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          {/* Routes for homepage and movies */}
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<Movies />} />

          {/* Routes for admin and authentication */}
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />{" "}
            </>
          )}

          {/* Routes for booking and user profile */}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/user" element={<UserProfile />} />{" "}
            </>
          )}

          {/* Routes for adding movies and admin profile */}
          {!isUserLoggedIn && isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/add" element={<AddMovie />} />
              <Route path="//user-admin" element={<AdminProfile />} />
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
