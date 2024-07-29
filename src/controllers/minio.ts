import { Request, Response, NextFunction } from 'express';

import httpStatusCode from 'http-status-codes';
import MinioService from '../services/minio';

export async function getUploadUrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const url = await MinioService.getUploadUrl();
    res.status(httpStatusCode.OK).json({ url: url });
  } catch (error) {
    next(error);
  }
}
