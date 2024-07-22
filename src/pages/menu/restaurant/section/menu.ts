import MenuItem from '../../../../components/menuItem';
import { IMenuItemData } from '../../../../interfaces/menu';

export default class RestaurantMenuList {
  element: HTMLElement;
  restaurantMenuData: IMenuItemData[];
  constructor(restaurantMenuData: IMenuItemData[]) {
    this.element = document.createElement('div');
    this.restaurantMenuData = restaurantMenuData;
  }

  init(): HTMLElement {
    this.element.classList.add('menu-list-wrapper');
    this.render();

    return this.element;
  }
  render() {
    this.restaurantMenuData.forEach((item: IMenuItemData) => {
      const menuItem = new MenuItem(
        item.id,
        item.name,
        item.imgSrc,
        item.portion,
        item.price,
        item.isPopular,
        'large',
      );
      this.element.appendChild(menuItem.element);
    });
  }
}
