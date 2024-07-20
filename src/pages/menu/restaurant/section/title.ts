export default class RestaurantTitle {
  element: HTMLElement;
  constructor() {
    this.element = document.createElement('div');

    this.init();
  }

  init(): void {
    this.element.classList.add('title-wrapper');

    const headingElement = document.createElement('h1');
    headingElement.className = 'title-wrapper__heading';
    headingElement.textContent = 'our newari ';
    this.element.appendChild(headingElement);

    const spanElement = document.createElement('span');
    spanElement.className = 'title-wrapper__heading-span';
    spanElement.textContent = 'menu';
    this.element.appendChild(spanElement);
  }
}
