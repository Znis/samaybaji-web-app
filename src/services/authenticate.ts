import jwt, { decode, sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import IUser, { IAuthUser } from '../interfaces/user';
import config from '../config';
import { UnauthenticatedError } from '../error/unauthenticatedError';
import loggerWithNameSpace from '../utils/logger';
import UserServices from './users';
import AuthenticateModel from '../models/authenticate';
import { ModelError } from '../error/modelError';
import AuthorizationService from './authorize';
import { Roles } from '../enums/roles';

const logger = loggerWithNameSpace('Authentication Service');

export default class AuthenticationService {
  static async login(body: Pick<IAuthUser, 'email' | 'password'>) {
    const existingUser = await UserServices.getUserByEmail(body.email);

    if (!existingUser) {
      logger.error(`User with email ${body.email} not found`);
      throw new UnauthenticatedError('Invalid Credentials');
    }
    const isValidPassword = await bcrypt.compare(
      body.password,
      existingUser.passwordHash,
    );
    if (!isValidPassword) {
      logger.error(
        `Password is not valid for the user with email ${body.email}`,
      );
      throw new UnauthenticatedError('Invalid Credentials');
    }
    const userInfoPayload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    const accessToken = sign(userInfoPayload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpiryS,
    });
    const refreshToken = sign(userInfoPayload, config.jwt.secret!, {
      expiresIn: config.jwt.refreshTokenExpiryS,
    });
    const decoded = decode(refreshToken) as { exp: number };
    const expiryTime = new Date(decoded.exp * 1000);

    const refreshTokenId = await this.addRefreshToken(
      existingUser.id,
      refreshToken,
      expiryTime,
    );
    const roleId = (await AuthorizationService.getRoleId(
      userInfoPayload.id,
    )) as string;

    const authenticatedUser = {
      ...userInfoPayload,
      roleId: roleId,
      restaurantId: '',
    };
    if (roleId == Roles.CUSTOMER_WITH_RESTAURANT) {
      const restaurantId = (await AuthorizationService.getRestaurantId(
        userInfoPayload.id,
      )) as string;
      authenticatedUser.restaurantId = restaurantId;
    }

    logger.info('Generated Access Token and Refresh Token');
    return {
      accessToken: accessToken,
      refreshTokenId: refreshTokenId,
      user: authenticatedUser,
    };
  }

  static async refresh(refreshTokenId: string | undefined) {
    if (!refreshTokenId) {
      logger.error('Refresh token Id not found');
      throw new UnauthenticatedError('Refresh token Id not found');
    }

    const refreshToken = await this.getRefreshToken(refreshTokenId);
    if (!refreshToken) {
      logger.error('Refresh token not found');
      throw new UnauthenticatedError('Invalid Token');
    }
    try {
      return jwt.verify(
        refreshToken,
        config.jwt.secret!,
        (
          err: jwt.VerifyErrors | null,
          user: string | jwt.JwtPayload | undefined,
        ) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              logger.error('Token Expired');
              throw new UnauthenticatedError('Token Expired');
            }
            logger.error('Refresh token invalid');
            throw new UnauthenticatedError('Invalid Token');
          }
          const decodedUser = user as IUser;
          const payload = {
            id: decodedUser.id,
            name: decodedUser.name,
            email: decodedUser.email,
          };
          const accessToken = sign(payload, config.jwt.secret!, {
            expiresIn: config.jwt.accessTokenExpiryS,
          });
          return { accessToken: accessToken };
        },
      );
    } catch {
      logger.error('Token Verification failed');
    }
  }

  static async getRefreshToken(refreshTokenId: string) {
    const data = await AuthenticateModel.getRefreshToken(refreshTokenId);
    if (!data) {
      return null;
    }
    return data.refreshToken;
  }
  static async addRefreshToken(
    userId: string,
    refreshToken: string,
    expiryTime: Date,
  ) {
    const queryResult = await AuthenticateModel.addRefreshToken(
      userId,
      refreshToken,
      expiryTime,
    )!;
    if (!queryResult.length) {
      logger.error('Could not add the refresh token');
      throw new ModelError('Could not add the refresh token');
    }
    return queryResult[0].id;
  }
}
