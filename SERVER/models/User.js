const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Booking", // references to associated bookings
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
