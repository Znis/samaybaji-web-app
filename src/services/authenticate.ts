import jwt, { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/user';
import config from '../config';
import { UnauthenticatedError } from '../error/unauthenticatedError';
import loggerWithNameSpace from '../utils/logger';
import UserServices from './users';
import AuthenticateModel from '../models/authenticate';

const logger = loggerWithNameSpace('Auth Services');

export default class AuthenticateServices {
  static async login(body: Pick<IUser, 'email' | 'password'>) {
    const existingUser = await UserServices.getUserByEmail(body.email);

    if (!existingUser) {
      logger.error(`User with email ${body.email} not found`);
      throw new UnauthenticatedError('Invalid Credentials');
    }
    const isValidPassword = await bcrypt.compare(
      body.password,
      existingUser.password,
    );
    if (!isValidPassword) {
      logger.error(
        `Password is not valid for the user with email ${body.email}`,
      );
      throw new UnauthenticatedError('Invalid Credentials');
    }
    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    const accessToken = sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpiryS,
    });
    const refreshToken = sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.refreshTokenExpiryS,
    });
    logger.info('Generated Access Token and Refresh Token');
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  static async refresh(authorization: string | undefined, userId: string) {
    if (!authorization) {
      logger.error('Authorization header not found');
      throw new UnauthenticatedError('No Authorization Headers');
    }
    const token = authorization.split(' ');

    if (token.length !== 2 || token[0] !== 'Bearer') {
      logger.error('Refresh token not found');
      throw new UnauthenticatedError('No Bearer Token');
    }
    const refreshToken = await this.getRefreshToken(token[1], userId);
    const verifiedData = jwt.verify(refreshToken, config.jwt.secret!) as IUser;
    if (!verifiedData) {
      logger.error('Refresh token invalid');
      throw new UnauthenticatedError('Invalid Token');
    }

    const payload = {
      id: verifiedData.id,
      name: verifiedData.name,
      email: verifiedData.email,
    };
    const accessToken = sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpiryS,
    });

    logger.info('Refresh token validated');
    return accessToken;
  }

  static async getAssignedPermission(userId: string) {
    logger.info(`Getting assigned permissions for user with userId ${userId}`);
    const permissions = await UserServices.getAssignedPermission(userId);
    return permissions;
  }

  static async getRefreshToken(refreshTokenId: string, userId: string) {
    const data = await AuthenticateModel.getRefreshToken(
      refreshTokenId,
      userId,
    );
    if (!data) {
      logger.error(`Refresh token for userId ${userId} not found`);
      return null;
    }
    return data.refreshToken;
  }
}
