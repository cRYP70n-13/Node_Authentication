import express, { NextFunction, Request, Response } from 'express';
import session, { Store } from 'express-session';
import { SESSION_OPTIONS } from './config';
import { register } from './routes';

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

  // Error handling middlewares
  app.use(function (req, res, next) {
    res.json({
      message: 'Not found'
    })
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({message: 'Server Error'});
  });

  return app;
}