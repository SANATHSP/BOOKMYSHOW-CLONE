const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  addedMovies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie", // Reference to the "Movie" model
    },
  ],
});
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
