import { IDish } from '../../interfaces/dish';
import { IReview } from '../../interfaces/review';
import DishInfo from './section/dishInfo';
import DishReview from './section/dishReview';

export default class DishDetailLayout {
  static element: HTMLElement = document.createElement('div');
  static async init(id: string): Promise<HTMLElement> {
    this.element.setAttribute('id', 'dish-detail-page');
    const dishDetailArray: IDish[] = [];
    const reviews: IReview[] = [];
    const dishDetailData = dishDetailArray.find(
      (data: IDish) => data.id === id,
    );
    this.element.appendChild(DishInfo.init(dishDetailData!));
    this.element.appendChild(DishReview.init(reviews));

    return this.element;
  }
}
