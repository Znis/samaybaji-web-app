export default class Content {
  static element: HTMLElement = document.createElement('div');

  static render(): HTMLElement {
    this.element.setAttribute('id', 'content');

    return this.element;
  }
}
