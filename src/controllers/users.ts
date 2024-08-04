import HttpStatusCode from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Users Controller');

/**
 * Controller function to retrieve all users from the UserService and sends them as a JSON response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} - A Promise that resolves when the response is sent.
 * @throws {BaseError} - If no users are found.
 */
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
    logger.error(`Error: `, error);
    next(error);
  }
}

/**
 * Controller function to retrieve a user from the UserService based on the provided userId and sends the user data as a JSON response.
 *
 * @param {Request} req - The request object containing the userId in the query parameters.
 * @param {Response} res - The response object used to send the user data.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} - A Promise that resolves when the response is sent.
 * @throws {BaseError} - If no user is found with the provided userId.
 */
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.query.userId as string;
    const data = await UserService.getUser(userId);
    if (!data) {
      next(new BaseError('No User Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    logger.error('User fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}

/**
 * Controller function to create a new user by sending a request to the UserService with the data from the request body.
 *
 * @param {Request} req - The request object containing the user data in the request body.
 * @param {Response} res - The response object used to send the created user data.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} - A Promise that resolves when the response is sent.
 * @throws {Error} - If there is an error creating the user.
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = req.body;
    const response = await UserService.createUser(data);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('User creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit a user by sending a request to the UserService with the provided userId and updated data.
 *
 * @param {Request} req - The request object containing the userId in the query parameters and the updated data in the request body.
 * @param {Response} res - The response object used to send the edited user data.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} - A Promise that resolves when the response is sent.
 * @throws {Error} - If there is an error editing the user.
 */
export async function editUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.query;
    const data = req.body;
    const response = await UserService.editUser(userId as string, data);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('User update failed');
    logger.error('Error: ', error);
    next(error);
  }
}
/**
 * Controller function to get the role ID associated with the given user ID.
 *
 * @param {Request} req - The request object containing the user ID in the query parameters.
 * @param {Response} res - The response object used to send the role data.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} - A Promise that resolves when the response is sent.
 * @throws {BaseError} - If no role is found with the given user ID.
 */
export async function getRoleId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.query;
    const role = await UserService.getRoleId(userId as string);
    if (!role) {
      next(new BaseError('No Role Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(role);
  } catch (error) {
    logger.error('Role retrieval error');
    logger.error(`Error: `, error);
    next(error);
  }
}

/**
 * Controller function to delete a user by their user ID.
 *
 * @param {Request} req - The request object containing the user ID in the query parameters.
 * @param {Response} res - The response object used to send the deletion status.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} - A Promise that resolves when the user is deleted successfully or an error occurs.
 */
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.query;
    await UserService.deleteUser(userId as string);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('User deletion failed');
    next(error);
  }
}
