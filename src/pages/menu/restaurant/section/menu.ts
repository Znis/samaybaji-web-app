import MenuItem from '../../../../components/menuItem';
import { IMenuItem } from '../../../../interfaces/menuItem';

export default class RestaurantMenuList {
  element: HTMLElement;
  restaurantMenuData: IMenuItem[];
  constructor(restaurantMenuData: IMenuItem[]) {
    this.element = document.createElement('div');
    this.restaurantMenuData = restaurantMenuData;
  }

  init(): HTMLElement {
    this.element.classList.add('menu-list-wrapper');
    this.render();

    return this.element;
  }
  render() {
    this.restaurantMenuData.forEach((item: IMenuItem) => {
      const menuItem = new MenuItem(item, 'large');
      this.element.appendChild(menuItem.element);
    });
  }
}
