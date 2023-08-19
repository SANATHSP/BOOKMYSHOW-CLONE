const express = require("express");
const {
  deleteUser,
  getUserById,
  getBookingsOfUser,
} = require("../controllers/user_controller");
const { login } = require("../controllers/user_controller");
const { signup } = require("../controllers/user_controller");
const { getAllUsers } = require("../controllers/user_controller");
const { updateUser } = require("../controllers/user_controller");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/:id", getUserById);
userRouter.get("/bookings/:id", getBookingsOfUser);

module.exports = userRouter;
