import genresRouter from '../router/genres.routes';
import customersRouter from '../router/customers.routes';
import moviesRouter from '../router/movies.routes';
import rentalsRouter from '../router/rentals.routes';
import accountsRouter from '../router/account.routes';
import errorMiddleware from '../middleware/error.middleware';


export default function routeConfiguration(app: any, formatRequestBody: any) {
  // transform middleware
  app.use(formatRequestBody);

  // routes.
  app.use(genresRouter);
  app.use(customersRouter);
  app.use(moviesRouter);
  app.use(rentalsRouter);
  app.use(accountsRouter);

  // error middleware...
  app.use(errorMiddleware);
}
