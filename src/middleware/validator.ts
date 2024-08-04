import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import loggerWithNameSpace from '../utils/logger';
import { SchemaError } from '../error/schemaError';

const logger = loggerWithNameSpace('Input Validator Middleware');

/**
 * Validates the query parameters of a request using the provided schema.
 *
 * @param {Schema} schema - The schema to validate the query parameters against.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void} This function does not return anything.
 */
export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info('Validating Schema');
    const { error, value } = schema.validate(req.query);

    if (error) {
      logger.error('Schema Invalid');
      next(new SchemaError(error.message));
      return;
    }
    logger.info('Schema Validated Successfully');
    req.query = value;

    next();
  };
}

/**
 * Validates the request body using the provided schema.
 *
 * @param {Schema} schema - The schema to validate the request body against.
 * @return {void} This function does not return anything.
 */
export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info('Validating Schema');
    const { error, value } = schema.validate(req.body);

    if (error) {
      logger.error('Schema Invalid');
      next(new SchemaError(error.message));
      return;
    }
    logger.info('Schema Validated Successfully');
    req.body = value;

    next();
  };
}
/**
 * Validates the request parameters using the provided schema.
 *
 * @param {Schema} schema - The schema to validate the request parameters against.
 * @return {Function} A middleware function that validates the request parameters and passes it to the next middleware.
 */
export function validateReqParams(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      next(new SchemaError(error.message));

      return;
    }

    req.params = value;

    next();
  };
}
