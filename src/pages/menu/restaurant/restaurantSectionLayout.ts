import { IRestaurantMenu } from '../../../interfaces/menu';
import RestaurantMenuList from './section/menu';
import RestaurantTitle from './section/title';

export default class RestaurantSectionLayout {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
  }

  init(restaurantMenu: IRestaurantMenu): HTMLElement {
    this.element.classList.add('restaurant');

    this.element.appendChild(new RestaurantTitle(restaurantMenu.name).init());
    this.element.appendChild(
      new RestaurantMenuList(restaurantMenu.menu).init(),
    );

    return this.element;
  }
}
