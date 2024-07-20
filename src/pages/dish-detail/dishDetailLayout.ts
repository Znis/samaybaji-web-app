import DishInfo from './section/dishInfo';
import DishReview from './section/dishReview';

export default class DishDetailLayout {
  static element: HTMLElement = document.createElement('div');
  static render(): HTMLElement {
    this.element.setAttribute('id', 'dish-detail-page');
    this.element.appendChild(DishInfo.render());
    this.element.appendChild(DishReview.render());

    return this.element;
  }
}
