import mongoose from 'mongoose';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { REDIS_OPTIONS, APP_PORT, MONGO_URI, MONGO_OPTIONS  } from './config';
import { createApp } from './app';

(async () => {
  // Connect to the Mongodb
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

  // Port to listen to
  const PORT = APP_PORT || 3000;

  // Configurations
  const redisStore = connectRedis(session);
  const client = new Redis(REDIS_OPTIONS);
  const store = new redisStore({ client });

  // Create Instance of the app
  const app = createApp(store);

  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
})();