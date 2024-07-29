import { ReviewTargetType } from '../enums/review';

export interface IReview {
  id: string;
  targetID: string;
  targetType: ReviewTargetType;
  userID: string;
  comment: string;
  postedDate: Date;
}

export interface ICreateReview {
  targetID: string;
  targetType: ReviewTargetType;
  userID: string;
  comment: string;
}
export interface IEditReview {
  comment: string;
}
