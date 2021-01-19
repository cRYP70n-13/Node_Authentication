import express from 'express';
import session, { Store } from 'express-session';
import { SESSION_OPTIONS } from './config';
import { notFound, serverError } from './middlewares';
import { home, login, register } from './routes';

export const createApp = (store: Store) => {

  // Instantiating the app
  const app = express();

  // Middlewares
  app.use(express.json());

  // The session Configuration
  app.use(
    session({
      ...SESSION_OPTIONS,
      store 
    })
  )

  // The routes
  app.use(register);
  app.use(login);
  app.use(home);

  // Error handling middlewares
  app.use(notFound);

  // Handling the server Errors
  app.use(serverError)

  return app;
}