export default class Button {
  static element = document.createElement('button');

  static init(text: string) {
    this.element.classList.add('button');
    this.element.innerHTML = text;
  }
}
