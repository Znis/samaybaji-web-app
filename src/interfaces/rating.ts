import { ReviewTargetType } from '../enums/review';

export interface IRating {
  id: string;
  targetId: string;
  targetType: ReviewTargetType;
  userId: string;
  rating: number;
}

export interface ICreateRating {
  targetType: ReviewTargetType;
  rating: number;
}
export interface IEditRating {
  rating: number;
}
