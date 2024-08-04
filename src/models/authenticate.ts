import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Authenticate Model');
export default class AuthenticateModel extends BaseModel {
  /**
   * Retrieves the refresh token associated with the given refresh token ID.
   *
   * @param {string} refreshTokenId - The ID of the refresh token to retrieve.
   * @return {Promise<string | null>} A Promise that resolves to the refresh token if found, or null if not found or an error occurs.
   */
  static getRefreshToken(refreshTokenId: string) {
    try {
      return this.queryBuilder()
        .select('refresh_token')
        .from('users_tokens')
        .where('id', refreshTokenId)
        .first();
    } catch (error) {
      logger.error('Model error: ', error);
      return null;
    }
  }
  /**
   * Adds a refresh token to the 'users_tokens' table for a given user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} refreshToken - The refresh token to be added.
   * @param {Date} expiryTime - The expiry time of the refresh token.
   * @return {Promise<number | null>} - The ID of the inserted row, or null if an error occurred.
   */
  static addRefreshToken(
    userId: string,
    refreshToken: string,
    expiryTime: Date,
  ) {
    try {
      return this.queryBuilder()
        .insert({
          userId: userId,
          refreshToken: refreshToken,
          expiryTime: expiryTime,
        })
        .into('users_tokens')
        .returning('id');
    } catch (error) {
      logger.error('Model error: ', error);
      return null;
    }
  }
}
