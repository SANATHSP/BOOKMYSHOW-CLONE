const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actors: [{ type: String, required: true }],
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }], // references to bookings
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin", // Reference to the admin who added the movie
    required: true, // The associated admin is required
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
