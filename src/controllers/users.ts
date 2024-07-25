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
    const users = data.map(({ passwordHash, ...user }) => user);
    return res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    logger.error('User fetch failed');
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userID = req.query.userID as string;
    const data = await UserService.getUser(userID);
    if (!data) {
      logger.error(`No user found with userID ${userID}`);
      next(new BaseError('No User Found'));
      return;
    }
    logger.info(`User with userID ${userID} found`);
    const { passwordHash, ...user } = data;
    return res.status(HttpStatusCode.OK).json(user);
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
    const { userID } = req.query;
    const data = req.body;
    const response = await UserService.editUser(userID as string, data);
    logger.info(`User with id ${userID} edited`);
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
    const { userID } = req.query;
    await UserService.deleteUser(userID as string);
    logger.info(`User with id ${userID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('User deletion failed');
    next(error);
  }
}
