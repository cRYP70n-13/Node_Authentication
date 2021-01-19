import { NextFunction, Request, Response } from "express";
import { isLoggedIn } from '../auth';

export const guest = (req: Request, res: Response, next: NextFunction) => {

  // Check if the user is already logged in
  if (isLoggedIn(req)) {
    return next(new Error('You are already logged in'));
  }

  next();
}