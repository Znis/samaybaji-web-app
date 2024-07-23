import { BaseModel } from './base';

export default class AuthenticateModel extends BaseModel {
  static getRefreshToken(refreshTokenId: string, userId: string) {
    try {
      return this.queryBuilder()
        .select('refresh_token')
        .from('users_tokens')
        .where('id', refreshTokenId)
        .andWhere('user_id', userId)
        .first();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
