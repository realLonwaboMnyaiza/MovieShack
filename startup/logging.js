const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.add(winston.transports.MongoDB, { db, level: "info" });
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "exception.log" }),
  );
};
