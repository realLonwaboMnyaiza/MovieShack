const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const { User, validate } = require("../models/user.model");
const { validate: authenticationValidation } = require("../models/auth.model");

router.get("/api/app/", (req, res) => {
  res
    .status(200)
    .send("Welcome to MovieShack, we hope you enjoy our product offering.");
});

router.get("/api/user/", authenticationMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id).select({
    password: 0,
  });
  let token = req.get("x-auth-token");
  if (!token) token = user.generateAuthenticationToken();
  res.header("x-auth-token", token).status(200).send(user);
});

router.put("/api/user/permissions/", async (req, res) => {
  const email = req.body.email;
  const isAdmin = req.body.isAdmin;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User does not exist.");

  user.isAdmin = isAdmin;
  await user.save();

  res.status(201).send("User rights have been elavated to ADMIN.");
});

router.post("/api/register/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const username = req.body.username;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  // todo: enforce password complexity with joi-password-complexity package.
  const password = req.body.password;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("This accound already exist.");

  user = new User({
    username,
    name,
    surname,
    email,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = user.generateAuthenticationToken();
  res
    .header("x-auth-token", token)
    .status(201)
    .send("User has been registered.");
});

router.post("/api/login/", async (req, res) => {
  const { error } = authenticationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).send("Email or password provided is invalid.");

  const hasAuthenticationCredentials = await bcrypt.compare(
    password,
    user.password,
  );
  if (!hasAuthenticationCredentials)
    return res.status(400).send("Email or password provided is invalid.");

  let token = user.generateAuthenticationToken();

  res
    .header("x-auth-token", token)
    .status(201)
    .send("User successfully logged in.");
});

// logout
router.post("/api/logout/", async (req, res) => {
  res.setHeader("x-auth-token", "");
  res.status(201).send("User has been logged out.");
});

module.exports = router;
