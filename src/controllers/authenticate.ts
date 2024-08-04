import HttpStatusCode from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import AuthenticateService from '../services/authenticate';
import loggerWithNameSpace from '../utils/logger';
import config from '../config';
import { Roles } from '../enums/roles';
import { ForbiddenError } from '../error/forbiddenError';

const logger = loggerWithNameSpace('Auth Controller');
/**
 * Async function for user login.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<Response>} The response with access token and user data.
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const { accessToken, refreshTokenId, user } =
      await AuthenticateService.login(body);
    if (user.roleId == Roles.SUPERADMIN) {
      throw new ForbiddenError('Admin is not allowed');
    }
    logger.info('Login Successful');
    res.cookie('refreshTokenId', refreshTokenId, {
      httpOnly: true,
      secure: true,
      maxAge: config.jwt.refreshTokenExpiryS * 1000,
    });

    return res
      .status(HttpStatusCode.OK)
      .json({ accessToken: accessToken, user: user });
  } catch (error) {
    logger.error('Login Failed');
    logger.error('Error: ', error);
    next(error);
  }
}

/**
 * Async function for admin login.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<Response>} The response with access token and user data.
 */
export async function adminLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { body } = req;
    const { accessToken, refreshTokenId, user } =
      await AuthenticateService.login(body);
    if (user.roleId != Roles.SUPERADMIN) {
      throw new Error('User is not an admin');
    }
    return res
      .status(HttpStatusCode.OK)
      .json({ accessToken: accessToken, user: user });
  } catch (error) {
    logger.error('Login Failed');
    logger.error('Error: ', error);
    next(error);
  }
}

/**
 * Asynchronously generates a new access token using the provided refresh token ID from the request cookies.
 *
 * @param {Request} req - The request object containing the refresh token ID in the cookies.
 * @param {Response} res - The response object used to send the new access token.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the new access token is successfully generated and sent in the response.
 * @throws {Error} If there is an error generating the new access token.
 */
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshTokenId } = req.cookies;
    const tokenResponse = await AuthenticateService.refresh(refreshTokenId);
    logger.info('New access token generated');
    return res.status(HttpStatusCode.OK).json(tokenResponse);
  } catch (error) {
    logger.error('New access token generation failed');
    logger.error('Error: ', error);
    next(error);
  }
}
