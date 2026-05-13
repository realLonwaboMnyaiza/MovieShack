// const genresRouter = require('../router/genres.routes');
// const customersRouter = require('../router/customers.routes');
// const movieRouter = require('../router/movies.routes');
// const rentalRouter = require('../router/rentals.routes');
// const accountRouter = require('../router/account.routes');
import genresRouter from '../router/genres.routes';
import customersRouter from '../src/router/cutomers.routes';
import movieRouter from '../router/movies.routes';
import rentalRouter from '../router/rentals.routes';
import accountRouter from '../router/account.routes';
import errorMiddleware from '../middleware/error.middleware';


export default function (app, formatRequestBody) {
  // transform middleware
  app.use(formatRequestBody);

  // routes.
  app.use(genresRouter);
  app.use(customersRouter);
  app.use(movieRouter);
  app.use(rentalRouter);
  app.use(accountRouter);

  // error middleware...
  app.use(errorMiddleware);
}
