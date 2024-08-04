import { NextFunction, Response } from 'express';

import { Request } from '../interfaces/authenticate';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('RequestLogger');

/**
 * Logs the HTTP method and URL of the request.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void}
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method}:${req.url}`);
  next();
}
