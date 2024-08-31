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
  windowMs: 1 * 1000,
  limit: 1000,
  message: 'Too many request',
});

app.use(helmet());

app.use(limiter);

app.use(
  cors({
    origin: 'https://samaybaji.jenishtwayana.com.np',
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
