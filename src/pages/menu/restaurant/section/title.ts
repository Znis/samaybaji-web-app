export default class RestaurantTitle {
  static element = document.createElement('h1');

  static render(): HTMLElement {
    this.element.className = 'heading';
    this.element.textContent = 'our newari ';

    const spanElement = document.createElement('span');
    spanElement.textContent = 'menu';
    this.element.appendChild(spanElement);

    return this.element;
  }
}
