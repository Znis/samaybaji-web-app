import { ReviewTargetType } from '../enums/review';
import { ICreateRating, IEditRating } from '../interfaces/rating';
import { BaseModel } from './base';

export default class RatingModel extends BaseModel {
  static getSpecificRating(targetId: string, userId: string) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .where('user_id', userId)
      .andWhere('target_id', targetId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getTargetRatings(targetId: string) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .andWhere('target_id', targetId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createRating(
    ratingData: ICreateRating,
    targetId: string,
    userId: string,
  ) {
    return this.queryBuilder()
      .insert({ ...ratingData, targetId: targetId, userId: userId })
      .into('ratings')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editRating(ratingId: string, editRatingData: IEditRating) {
    return this.queryBuilder()
      .update(editRatingData)
      .from('ratings')
      .where('id', ratingId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteRating(ratingId: string) {
    return this.queryBuilder()
      .del()
      .from('ratings')
      .where('id', ratingId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
