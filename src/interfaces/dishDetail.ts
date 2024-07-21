export interface IDishDetailData {
  id: string;
  name: string;
  description: string;
  attributes: string[];
  items: string[];
  imgSrc: string;
  price: number;
  portion: string;
  rating: number;
  totalReviews: number;
  customerReviews: ICustomerReviewData[];
}

export interface ICustomerReviewData {
  name: string;
  comment: string;
  postedDate: string;
  profileImgSrc: string;
}
