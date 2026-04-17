const mongoose = require("mongoose");
const winston = require("winston");

module.exports = async function initializeDatabaseConnection() {
  await mongoose.connect(db);
  winston.info("Connected to database...");
};
