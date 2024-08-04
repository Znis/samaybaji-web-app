import express from 'express';
import config from './config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import { requestLogger } from './middleware/logger';
import { genericErrorHandler, notFoundError } from './middleware/errorHandler';
import router from './routes';

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: 'Too many request',
});

app.use(helmet());

app.use(limiter);

const allowerdOrigins = [
  'http://localhost:5173/',
  'https://66af2a270e15ab4bba459ca4--spontaneous-pegasus-f8422c.netlify.app/',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || !allowerdOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not Allowed'));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use(router);

app.use(genericErrorHandler);
app.use(notFoundError);

app.listen(config.port, () =>
  console.log(`Server Listening at Port ${config.port}`),
);
