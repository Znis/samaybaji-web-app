import HttpStatusCode from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import AuthenticateService from '../services/authenticate';
import loggerWithNameSpace from '../utils/logger';
import config from '../config';

const logger = loggerWithNameSpace('Auth Controller');
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const { accessToken, refreshTokenId, user } =
      await AuthenticateService.login(body);
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
    next(error);
  }
}

//function to generate a new accesstoken with the refreshtoken
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshTokenId } = req.cookies;
    const tokenResponse = await AuthenticateService.refresh(refreshTokenId);
    logger.info('New access token generated');
    return res.status(HttpStatusCode.OK).json(tokenResponse);
  } catch (error) {
    logger.error('New access token generation failed');
    next(error);
  }
}
