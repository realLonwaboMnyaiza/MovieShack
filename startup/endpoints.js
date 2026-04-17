const genresRouter = require("../router/genres.routes");
const customersRouter = require("../router/customers.routes");
const movieRouter = require("../router/movies.routes");
const rentalRouter = require("../router/rentals.routes");
const accountRouter = require("../router/account.routes");

module.exports = function (app) {
  app.use(genresRouter);
  app.use(customersRouter);
  app.use(movieRouter);
  app.use(rentalRouter);
  app.use(accountRouter);
};
