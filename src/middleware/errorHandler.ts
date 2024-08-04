import { NextFunction, Response } from 'express';
import HttpStatusCode from 'http-status-codes';
import { Request } from '../interfaces/authenticate';
import { UnauthenticatedError } from '../error/unauthenticatedError';
import { BadRequestError } from '../error/badRequestError';
import { ModelError } from '../error/modelError';
import { SchemaError } from '../error/schemaError';
import { ForbiddenError } from '../error/forbiddenError';
import loggerWithNameSpace from '../utils/logger';
import { BaseError } from '../error/baseError';

const logger = loggerWithNameSpace('Error Handler Middleware');

/**
 * Handles the case when a resource is not found.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Response} The HTTP response with a status code of 404 and a JSON object containing the error message.
 */
export function notFoundError(req: Request, res: Response) {
  logger.error('Resource not found');
  return res.status(HttpStatusCode.NOT_FOUND).json({
    message: 'Resource Not Found',
  });
}
/**
 * Handles generic errors and returns appropriate HTTP response.
 *
 * @param {Error} error - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Response} The HTTP response.
 */
export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof UnauthenticatedError) {
    logger.error(`User Unauthenticated: ${error.message}`);
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: error.message });
  }

  if (error instanceof BadRequestError) {
    logger.error(`Bad request error: ${error.message}`);
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: error.message });
  }
  if (error instanceof SchemaError) {
    logger.error(`Input data schema error: ${error.message}`);
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: error.message });
  }

  if (error instanceof ModelError) {
    logger.error(`Model response error: ${error.message}`);
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: error.message });
  }
  if (error instanceof ForbiddenError) {
    logger.error(`Forbidden resource error: ${error.message}`);
    return res
      .status(HttpStatusCode.FORBIDDEN)
      .json({ message: error.message });
  }
  if (error instanceof BaseError) {
    logger.error(`Base error: ${error.message}`);
    return res
      .status(HttpStatusCode.FORBIDDEN)
      .json({ message: error.message });
  }

  logger.error(error.message);
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    // message: 'INTERNAL SERVER ERROR',
  });
}
