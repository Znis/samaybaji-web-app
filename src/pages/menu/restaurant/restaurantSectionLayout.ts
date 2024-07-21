import { IRestaurantMenu } from '../../../interfaces/menu';
import RestaurantMenuList from './section/menu';
import RestaurantTitle from './section/title';

export default class RestaurantSectionLayout {
  element: HTMLElement;
  restaurantMenu: IRestaurantMenu;

  constructor(restaurantMenu: IRestaurantMenu) {
    this.element = document.createElement('section');
    this.restaurantMenu = restaurantMenu;
    this.init();
  }

  init(): void {
    if (this.element) {
      this.element.classList.add('restaurant');

      const restaurantTitleSection = new RestaurantTitle(
        this.restaurantMenu.name,
      );
      this.element.appendChild(restaurantTitleSection.element);

      const restaurantMenuSection = new RestaurantMenuList(
        this.restaurantMenu.menu,
      );
      this.element.appendChild(restaurantMenuSection.element);
    }
  }
}
