const winston = require("winston");
require("winston-mongodb");

// todo: read documentation. compare to alt packages.
// possible logging memory leaks...
const Logger = winston.createLogger({
  transports: [
    // todo: read documentation on adding colorized console transport...
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "./exceptions.log" }),
  ],
});

function logToDatabase(db) {
  Logger.add(new winston.transports.MongoDB({ db, level: "error" }));
}

module.exports.logToDatabase = logToDatabase;
module.exports.Logger = Logger;
