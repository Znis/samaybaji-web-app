import HttpStatusCode from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Users Controller');

export async function getUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body;
    const data = await UserService.getUserByEmail(body.email);
    if (!data) {
      logger.error(`No user found with email ${body.email}`);
      next(new BaseError('No User Found'));
      return;
    }
    logger.info(`User with email ${body.email} found`);
    const { password, ...otherData } = data!;
    return res.status(HttpStatusCode.OK).json(otherData);
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
    const { id } = req.query;
    const data = req.body;
    const response = await UserService.editUser(id as string, data);
    logger.info(`User with id ${id} edited`);
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
    const { id } = req.query;
    await UserService.deleteUser(id as string);
    logger.info(`User with id ${id} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('User deletion failed');
    next(error);
  }
}
