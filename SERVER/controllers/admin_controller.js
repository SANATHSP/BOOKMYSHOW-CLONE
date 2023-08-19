const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  //cheching for existing admin
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "invalid" });
  }
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists!" });
  }

  let admin;
  //encrypting the password to bcrypt
  const hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "unable to store admin!" });
  }
  return res.status(201).json({ admin });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // input validation
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid input" });
  }
  //checking for existing admin
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }
  //password validation
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  ); // returns a boolean val

  if (!isPasswordCorrect) {
    //password do not match
    return res.status(400).json({ message: "Password Incorrect" });
  }
  //JWT verification
  const token = jwt.sign({ id: existingAdmin._id }, process.env.secret_Key, {
    expiresIn: "1d",
  });

  return res.status(200).json({
    message: "Authentication successful",
    token,
    id: existingAdmin._id,
  });
};
const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return console.log(err);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins });
};

const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id).populate("addedMovies");
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};

module.exports = { addAdmin, adminLogin, getAdmins, getAdminById };
