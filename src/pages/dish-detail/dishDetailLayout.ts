import { dishDetailArray } from '../../dummyData';
import { IDishDetailData } from '../../interfaces/dishDetail';
import DishInfo from './section/dishInfo';
import DishReview from './section/dishReview';

export default class DishDetailLayout {
  static element: HTMLElement = document.createElement('div');
  static async init(id: string): Promise<HTMLElement> {
    this.element.setAttribute('id', 'dish-detail-page');
    const dishDetailData = dishDetailArray.find(
      (data: IDishDetailData) => data.id === id,
    );
    this.element.appendChild(DishInfo.init(dishDetailData!));
    this.element.appendChild(DishReview.init(dishDetailData!.customerReviews));

    return this.element;
  }
}
