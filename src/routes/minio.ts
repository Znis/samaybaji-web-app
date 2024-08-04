import express from 'express';
import { getUploadUrl } from '../controllers/minio';
import { authenticate } from '../middleware/authenticate';

const minioRouter = express();

//Routes for Authenticated User
minioRouter.get('/', authenticate, getUploadUrl);

export default minioRouter;
