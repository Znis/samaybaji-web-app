import MenuItem from '../../../../components/menuItem';

export default class RestaurantMenuList {
  static element = document.createElement('div');
  static render(): HTMLElement {
    this.element.classList.add('restaurant-menu-list');
    for (let i = 0; i < 5; i++) {
      const menuItem = new MenuItem(
        `id-${i + 1}`,
        'Samaybaji',
        './assets/images/home-img.png',
        1,
        150,
        true,
      );
      this.element.appendChild(menuItem.element);
    }
    return this.element;
  }
}
