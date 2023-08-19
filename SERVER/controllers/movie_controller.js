const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Movie = require("../models/movie");

const addMovie = async (req, res, next) => {
  //extracting the token from header
  const extractedToken = req.headers.authorization.split(" ")[1]; // authorization header is splited from the token;
  //extracted token validation
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "token not found" });
  }
  //finding the admin id from  verifying the token
  let adminId;
  //verify token
  jwt.verify(extractedToken, process.env.secret_Key, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create a new movie
  //destructer from req.body
  const { title, description, actors, releaseDate, posterUrl, featured } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !actors &&
    actors.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      actors,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      posterUrl,
      admin: adminId, //adding the admin if to obtain the decoded token;
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request failed" });
  }
  return res.status(201).json({ movie });
};

const getAllMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    return console.log(err);
  }
  if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movies });
};

const getMoviesById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!movie) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  return res.status(200).json({ movie });
};

// const deleteMovie = async (req, res, next) => {
//   const id = req.params.id;

//   // Check if the movie exists
//   let movie;
//   try {
//     movie = await Movie.findById(id);
//   } catch (err) {
//     return res.status(500).json({ message: "Request Failed" });
//   }

//   if (!movie) {
//     return res.status(404).json({ message: "Movie not found" });
//   }

//   // Verify if deleting the movie is the admin
//   if (movie.admin.toString() !== req.decodedToken.adminId) {
//     return res
//       .status(403)
//       .json({ message: "Not authorized to delete this movie" });
//   }

//   //----

//   // Delete the movie
//   try {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await movie.remove({ session });
//     await session.commitTransaction();
//   } catch (err) {
//     return res.status(500).json({ message: "Failed to delete movie" });
//   }

//   return res.status(200).json({ message: "Movie deleted successfully" });
// };

module.exports = { addMovie, getAllMovies, getMoviesById };
