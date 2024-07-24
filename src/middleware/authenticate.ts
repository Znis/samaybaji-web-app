import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UnauthenticatedError } from '../error/unauthenticatedError';
import IUser from '../interfaces/user';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Authenticate Middleware');

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    logger.error('Authorization header not found');
    return res.status(401).json({ error: 'Authentication Failed' });
  }
  const token = authorization.split(' ');
  if (token.length !== 2 || token[0] !== 'Bearer') {
    logger.info('Access Token not found');
    return res.status(401).json({ error: 'Authentication Failed' });
  }

  try {
    return jwt.verify(token[1], config.jwt.secret!, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          logger.error('Token Expired');
          next(new UnauthenticatedError('Token Expired'));
          return;
        }
        logger.error('Error verifying the authenticity of token');
        next(new UnauthenticatedError('Unauthenticated'));
        return;
      }
      const decodedUser = user as IUser;
      req.user = decodedUser;
      next();
    });
  } catch {
    logger.error('Token Verification failed');
    next(new UnauthenticatedError('Unauthenticated'));
  }
}
