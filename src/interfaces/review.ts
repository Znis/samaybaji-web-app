import { ReviewTargetType } from '../enums/review';

export interface IReview {
  id: string;
  targetId: string;
  targetType: ReviewTargetType;
  userId: string;
  comment: string;
  updatedAt: Date;
}

export interface ICreateReview {
  targetId: string;
  targetType: ReviewTargetType;
  userId: string;
  comment: string;
}
export interface IEditReview {
  comment: string;
}
export interface IReviewResponse {
  dishReviews: IReview[];
  restaurantReviews: IReview[];
}
