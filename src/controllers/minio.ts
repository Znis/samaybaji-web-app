import { Request, Response, NextFunction } from 'express';

import httpStatusCode from 'http-status-codes';
import MinioService from '../services/minio';

/**
 * Controller function to retrieve an upload URL from MinioService.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Promise<void>} - A Promise that resolves when the response is sent.
 */
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
