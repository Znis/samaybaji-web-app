import { ReviewTargetType } from '../enums/review';

export interface IRating {
  id: string;
  targetID: string;
  targetType: ReviewTargetType;
  userID: string;
  rating: number;
}

export interface ICreateRating {
  targetID: string;
  targetType: ReviewTargetType;
  userID: string;
  rating: number;
}
export interface IEditRating {
  rating: number;
}
