import { ReviewTargetType } from '../enums/review';
import { ICreateReview, IEditReview } from '../interfaces/review';
import { BaseModel } from './base';

export default class ReviewModel extends BaseModel {
  static getAllReviews(targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
      .where('target_type', targetType)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getReviewsByUserID(userID: string, targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
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
  static getSpecificReviewByUserID(
    userID: string,
    targetID: string,
    targetType: ReviewTargetType,
  ) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
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
  static getReviews(targetID: string, targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
      .where('target_type', targetType)
      .andWhere('target_id', targetID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createReview(reviewData: ICreateReview) {
    return this.queryBuilder()
      .insert(reviewData)
      .into('reviews')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editReview(reviewID: string, editReviewData: IEditReview) {
    return this.queryBuilder()
      .update(editReviewData)
      .from('reviews')
      .where('id', reviewID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteReview(reviewID: string) {
    return this.queryBuilder()
      .del()
      .from('reviews')
      .where('id', reviewID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
