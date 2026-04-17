const winston = require("winston");
require("winston-mongodb");

winston.add(winston.transports.MongoDB, { db });
winston.handleExceptions(
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
  new winston.transports.File({ filename: "exception.log" }),
);
