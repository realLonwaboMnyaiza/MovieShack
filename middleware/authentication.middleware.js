const pathModule = require("path");
const environment = process.env.NODE_ENV || "dev";
const path = pathModule.join(process.cwd(), ".env.", environment);
require("dotenv").config({ path });
const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token to redeem.");

  try {
    const privateKey = process.env.KEY;
    const decodedToken = jwt.verify(token, privateKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send("Could not verify token provided.");
    next(error);
  }
};
