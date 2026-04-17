const winston = require("winston");
require("winston-mongodb");

const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "./exceptions.log" }),
  ],
});

function logToDatabase(db) {
  Logger.add(new winston.transports.MongoDB({ db, level: "info" }));
}

module.exports.logToDatabase = logToDatabase;
module.exports.Logger = Logger;
