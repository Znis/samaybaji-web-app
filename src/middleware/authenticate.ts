import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import jwt from 'jsonwebtoken';
import config from '../config';
import AuthenticateService from '../services/authenticate';
import { UnauthenticatedError } from '../error/unauthenticatedError';
import IUser from '../interfaces/user';
import { ForbiddenError } from '../error/forbiddenError';
import loggerWithNameSpace from '../utils/logger';
import { ModelError } from '../error/modelError';

const logger = loggerWithNameSpace('Auth Middleware');

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
    const verifiedData = jwt.verify(token[1], config.jwt.secret!) as IUser;
    if (!verifiedData) {
      logger.error('Error verifying the authenticity of token');
      next(new UnauthenticatedError('Unauthenticated'));
      return;
    }
    req.user = verifiedData;

    next();
  } catch {
    logger.error('Token Verification failed');
    next(new UnauthenticatedError('Unauthenticated'));
  }
}

export function authorize(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user!;
      const permissions = await AuthenticateService.getAssignedPermission(
        user.id!,
      );
      if (!permissions!.includes(permission)) {
        logger.error('Operation not permitted');
        next(new ForbiddenError('Forbidden'));
        return;
      }
      next();
    } catch {
      logger.error('Permission Checking failed');
      next(new ModelError('Permission retrieval error'));
    }
  };
}
