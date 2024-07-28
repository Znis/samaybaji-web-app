import { ReviewTargetType } from '../enums/review';

export interface IReview {
  id: string;
  targetID: string;
  targetType: ReviewTargetType;
  userID: string;
  comment: string;
}
