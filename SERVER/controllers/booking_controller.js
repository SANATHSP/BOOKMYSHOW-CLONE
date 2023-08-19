const Booking = require("../models/book");
const Movie = require("../models/movie");
const User = require("../models/user");
const mongoose = require("mongoose");

const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  //validating exisitng user and movie
  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }

  let booking;

  try {
    booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    // Start a transaction session
    const session = await mongoose.startSession();
    session.startTransaction();
    // Update user's and movie's bookings
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    // Save changes in the transaction session
    await existingUser.save({ session });
    await existingMovie.save({ session });
    // Commit the transaction
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "unable to create a booking" });
  }
  return res.status(201).json({ booking });
};

const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res
      .status(404)
      .json({ message: "booking with the given ID was not found." });
  }
  return res.status(200).json({ booking });
};

const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndRemove(id).populate("user movie");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    // Remove the booking from user and movie
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    // Save changes in the transaction session
    await booking.movie.save({ session });
    await booking.user.save({ session });
    // Commit the transaction
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

module.exports = { newBooking, getBookingById, deleteBooking };
