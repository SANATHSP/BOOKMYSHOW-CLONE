import { configureStore, createSlice } from "@reduxjs/toolkit";

// create a slice for user authentication
const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false }, // Initial state for user authentication
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId"); // Remove user ID from local storage
      state.isLoggedIn = false;
    },
  },
});

// Create a slice for admin authentication
const adminSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("adminId"); // Remove admin ID from local storage
      localStorage.removeItem("token"); // Remove admin token from local storage
      state.isLoggedIn = false;
    },
  },
});

// Export actions for user and admin slices
export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

// Configure the Redux store with the combined reducers
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});
