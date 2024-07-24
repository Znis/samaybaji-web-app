import express from 'express';
import config from './config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { requestLogger } from './middleware/logger';
import { genericErrorHandler, notFoundError } from './middleware/errorHandler';
import router from './routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
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
