import mongoose from 'mongoose';
import express from 'express';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { REDIS_OPTIONS, SESSION_OPTIONS, APP_PORT, MONGO_URI, MONGO_OPTIONS  } from './config';
import { } from './config/session';

(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

  const app = express();

  const PORT = APP_PORT || 3000;

  const redisStore = connectRedis(session);
  const client = new Redis(REDIS_OPTIONS);

  app.use(
    session({
      ...SESSION_OPTIONS,
      store: new redisStore({ client })
    })
  )

  app.get('/', (req, res) => res.json({
    message: 'OK 🚀'
  }));

  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
})()