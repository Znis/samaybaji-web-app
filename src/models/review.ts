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
  static getReviewsByUserId(userId: string, targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
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
  static getSpecificReviewByUserId(
    userId: string,
    targetId: string,
    targetType: ReviewTargetType,
  ) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
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
  static getReviews(targetId: string, targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
      .where('target_type', targetType)
      .andWhere('target_id', targetId)
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

  static editReview(reviewId: string, editReviewData: IEditReview) {
    return this.queryBuilder()
      .update(editReviewData)
      .from('reviews')
      .where('id', reviewId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteReview(reviewId: string) {
    return this.queryBuilder()
      .del()
      .from('reviews')
      .where('id', reviewId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
