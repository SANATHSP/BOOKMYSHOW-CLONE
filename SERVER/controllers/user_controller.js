const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Booking = require("../models/book");

// get all user data list
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ user: users });
};

// create new user
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // input validation
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid input" });
  }

  //password encryption
  const hashedPassword = bcrypt.hashSync(password);
  // creating a new user
  let user;
  try {
    user = await new User({ name, email, password: hashedPassword });
    //saving the doc to db
    user = await user.save();
    return res.status(201).json({ message: "created" });
  } catch (err) {
    return console.log(err);
  }
  //checking user for falsey value
  if (!user) {
    return res.status(500).json({ message: "unexpected error" });
  }
  return res.status(201).json({ id: user._id });
};

// update a user by id
const updateUser = async (req, res, next) => {
  //extract the id from request body of params's id
  const id = req.params.id;
  const { name, email, password } = req.body;
  // input validation
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "something went wrong" });
  }
  res.status(200).json({ message: "Updated successfully" });
};

// delete a user by id
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "something went wrong" });
  }
  res.status(200).json({ message: "Deleted successfully" });
};
// login function - to match the credentials from signup
const login = async (req, res, next) => {
  //object destructuring
  const { email, password } = req.body;
  //email and password input validation
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid input" });
  }
  //Retrieve the user from the database based on email
  let existingUser;
  try {
    //checking for existing user using findOne().
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Database error" });
  }
  //Compare the provided password with the hashed password from the database
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "unable to find User from this id" });
  }

  //compare the existing user's credentials using bcrypt comparesync function
  const isPasswordCorrect = bcrypt.compare(password, existingUser.password); // returns a boolean val
  if (!isPasswordCorrect) {
    //password do not match
    return res.status(400).json({ message: "Password Incorrect" });
  }
  return res
    .status(200)
    .json({ message: "login successful", id: existingUser._id });
};

const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Booking.find({ user: id })
      .populate("movie")
      .populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Unable to get Bookings" });
  }
  return res.status(200).json({ bookings });
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ user });
};

//export the function
module.exports = {
  getAllUsers,
  signup,
  updateUser,
  deleteUser,
  login,
  getBookingsOfUser,
  getUserById,
};
