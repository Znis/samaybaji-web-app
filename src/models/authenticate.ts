import { BaseModel } from './base';

export default class AuthenticateModel extends BaseModel {
  static getRefreshToken(refreshTokenId: string) {
    try {
      return this.queryBuilder()
        .select('refresh_token')
        .from('users_tokens')
        .where('id', refreshTokenId)
        .first();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
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
      console.log(error);
      return null;
    }
  }
}
