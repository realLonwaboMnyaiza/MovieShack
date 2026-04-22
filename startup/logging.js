const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.prettyPrint() }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "./exceptions.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/movieShackTest",
      collection: "logs",
      level: "error",
    }),
  ],
});

module.exports.logger = logger;
