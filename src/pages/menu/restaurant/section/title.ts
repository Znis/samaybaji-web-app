export default class RestaurantTitle {
  element: HTMLElement;
  restaurantMenuName: string;
  constructor(restaurantMenuName: string) {
    this.element = document.createElement('div');
    this.restaurantMenuName = restaurantMenuName;
  }

  init(): HTMLElement {
    this.element.classList.add('title-wrapper');

    const headingElement = document.createElement('h1');
    headingElement.className = 'title-wrapper__heading';
    headingElement.textContent = this.restaurantMenuName;
    this.element.appendChild(headingElement);

    const spanElement = document.createElement('span');
    spanElement.className = 'title-wrapper__heading-span';
    spanElement.textContent = 'menu';
    this.element.appendChild(spanElement);

    return this.element;
  }
}
