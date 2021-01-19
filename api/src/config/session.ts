import { SessionOptions } from 'express-session';
import { IN_PRODE } from './app';

const HALF_HOUR = 1000 * 60 * 30;

export const {
  SESSION_SECRET = `Please Keep it as secret as possible`,
  SESSION_NAME = `sid`,
  SESSION_IDLE_TIMEOUT = HALF_HOUR
} = process.env

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PRODE,
    sameSite: true
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
};