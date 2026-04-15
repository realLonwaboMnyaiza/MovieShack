const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User, validate } = require("../models/user.model");

router.post("/api/register/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send("Request is not valid.");

  const username = req.body.username;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("This accound already exist.");

  user = new User({
    username,
    name,
    surname,
    email,
  });

  await user.save();

  res.status(401).send("User has been registered.");
});

router.post("/api/login", async (req, res) => {});
