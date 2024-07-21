import { dishDetailData } from '../../dummyData';
import DishInfo from './section/dishInfo';
import DishReview from './section/dishReview';

export default class DishDetailLayout {
  static element: HTMLElement = document.createElement('div');
  static init(): HTMLElement {
    this.element.setAttribute('id', 'dish-detail-page');

    this.element.appendChild(DishInfo.init(dishDetailData));
    this.element.appendChild(DishReview.init(dishDetailData.customerReviews));

    return this.element;
  }
}
