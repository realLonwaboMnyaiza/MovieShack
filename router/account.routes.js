const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user.model");
const {
  generateToken,
  validate: authenticationValidation,
} = require("../models/auth.model");

router.post("/api/register/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send("Request is not valid.");

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

  // const alteredRequestBody = _.pick(req.body, [
  //   "username",
  //   "name",
  //   "surname",
  //   "email",
  //   "password",
  // ]);
  // const savedUser = _.pick(user, ["username", "email"]);

  // console.log(alteredRequestBody, savedUser);

  const token = generateToken();
  res
    .header("x-auth-token", token)
    .status(401)
    .send("User has been registered.");
});

router.post("/api/login", async (req, res) => {
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

  const token = generateToken();
  res.send(token);
});

module.exports = router;
