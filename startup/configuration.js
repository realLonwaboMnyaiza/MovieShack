require("dotenv").config();

module.exports = function () {
  if (!process.env.KEY) {
    throw new Error("Crucial environment variables are not defined.");
  }
};
