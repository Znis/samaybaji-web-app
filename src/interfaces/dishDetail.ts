export interface dishDetailData {
  id: string;
  name: string;
  description: string;
  attributes: string[];
  items: string[];
  imgSrc: string;
  price: number;
  quantity: number;
  rating: number;
  totalReviews: number;
  customerReviews: customerReviewData[];
}

export interface customerReviewData {
  name: string;
  comment: string;
  postedDate: string;
  profileImgSrc: string;
}
