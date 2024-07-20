import RestaurantSectionLayout from './restaurant/restaurantSectionLayout';

export default class MenuPageLayout {
  static element: HTMLElement = document.createElement('div');
  static render(): HTMLElement {
    this.element.setAttribute('id', 'menu-page');
    for (let i = 0; i < 4; i++) {
      this.element.appendChild(new RestaurantSectionLayout(`${i + 1}`).element);
    }

    return this.element;
  }
}
