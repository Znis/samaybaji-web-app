import { restaurantMenus } from '../../dummyData';
import RestaurantSectionLayout from './restaurant/restaurantSectionLayout';

export default class MenuPageLayout {
  static element: HTMLElement = document.createElement('div');
  static init(): HTMLElement {
    this.element.setAttribute('id', 'menu-page');
    this.element.innerHTML = '';
    this.renderRestaurantsMenu();

    return this.element;
  }
  static renderRestaurantsMenu() {
    restaurantMenus.forEach((restaurant) => {
      this.element.appendChild(new RestaurantSectionLayout().init(restaurant));
    });
  }
}
