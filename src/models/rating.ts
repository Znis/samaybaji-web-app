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
  static getRatingsByUserID(userID: string, targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .where('user_id', userID)
      .andWhere('target_type', targetType)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getSpecificRatingByUserID(
    userID: string,
    targetID: string,
    targetType: ReviewTargetType,
  ) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .where('user_id', userID)
      .andWhere('target_type', targetType)
      .andWhere('target_id', targetID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getRatings(targetType: ReviewTargetType, targetID: string) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .andWhere('target_type', targetType)
      .andWhere('target_id', targetID)
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

  static editRating(ratingID: string, editRatingData: IEditRating) {
    return this.queryBuilder()
      .update(editRatingData)
      .from('ratings')
      .where('id', ratingID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteRating(ratingID: string) {
    return this.queryBuilder()
      .del()
      .from('ratings')
      .where('id', ratingID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
