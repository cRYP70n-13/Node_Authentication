import { NextFunction, Request, Response } from "express";
import { isLoggedIn } from '../auth';
import { Unauthorized } from '../errors'

export const guest = (req: Request, res: Response, next: NextFunction) => {

  // Check if the user is already logged in
  if (isLoggedIn(req)) {
    return next(new Unauthorized('You are already logged in'));
  }

  next();
}

export const auth = (req: Request, res: Response, next: NextFunction) => {

  // Check if the user is already logged in
  if (!isLoggedIn(req)) {
    return next(new Unauthorized('You must be logged in'));
  }

  next();
}