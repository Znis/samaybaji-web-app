export default class Content {
  static element: HTMLElement = document.createElement('div');

  static init(): HTMLElement {
    this.element.setAttribute('class', 'content');
    return this.element;
  }
  static render(component: HTMLElement) {
    this.element.innerHTML = '';
    this.element.appendChild(component);
  }
}
