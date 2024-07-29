import express from 'express';
import { getUploadUrl } from '../controllers/minio';
import { authenticate } from '../middleware/authenticate';

const minioRouter = express();

minioRouter.get('/', authenticate, getUploadUrl);

export default minioRouter;
