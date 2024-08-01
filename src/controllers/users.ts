import HttpStatusCode from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Users Controller');

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await UserService.getAllUsers();
    if (!data) {
      next(new BaseError('No Any User Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    logger.error('User fetch failed');
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.query.userId as string;
    const data = await UserService.getUser(userId);
    if (!data) {
      logger.error(`No user found with userId ${userId}`);
      next(new BaseError('No User Found'));
      return;
    }
    logger.info(`User with userId ${userId} found`);
    return res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    logger.error('User fetch failed');
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = req.body;
    const response = await UserService.createUser(data);
    logger.info('New user created');
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('User creation failed');
    next(error);
  }
}
export async function editUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.query;
    const data = req.body;
    const response = await UserService.editUser(userId as string, data);
    logger.info(`User with id ${userId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('User update failed');
    next(error);
  }
}
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.query;
    await UserService.deleteUser(userId as string);
    logger.info(`User with id ${userId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('User deletion failed');
    next(error);
  }
}
