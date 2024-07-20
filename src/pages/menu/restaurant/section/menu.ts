import MenuItem from '../../../../components/menuItem';

export default class RestaurantMenuList {
  element: HTMLElement;
  constructor() {
    this.element = document.createElement('div');

    this.init();
  }
  init(): void {
    this.element.classList.add('menu-list-wrapper');
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
  }
}
