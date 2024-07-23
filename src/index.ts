import express from 'express';
import config from './config';
import { requestLogger } from './middleware/logger';
import { genericErrorHandler, notFoundError } from './middleware/errorHandler';
import router from './routes';

const app = express();

app.use(express.json());

app.use(requestLogger);
app.use(router);

app.use(genericErrorHandler);
app.use(notFoundError);

app.listen(config.port, () =>
    console.log(`Server Listening at Port ${config.port}`)
  );