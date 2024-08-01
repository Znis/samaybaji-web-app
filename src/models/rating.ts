import { ReviewTargetType } from '../enums/review';
import { ICreateRating, IEditRating } from '../interfaces/rating';
import { BaseModel } from './base';

export default class RatingModel extends BaseModel {
  static getAllRatings() {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getRatingsByUserId(userId: string, targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .where('user_id', userId)
      .andWhere('target_type', targetType)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getSpecificRatingByUserId(
    userId: string,
    targetId: string,
    targetType: ReviewTargetType,
  ) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .where('user_id', userId)
      .andWhere('target_type', targetType)
      .andWhere('target_id', targetId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getRatings(targetType: ReviewTargetType, targetId: string) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .andWhere('target_type', targetType)
      .andWhere('target_id', targetId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createRating(ratingData: ICreateRating) {
    return this.queryBuilder()
      .insert(ratingData)
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
