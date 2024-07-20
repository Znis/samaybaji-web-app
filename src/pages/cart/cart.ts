export default class Cart {
  static htmlTemplateurl = './assets/templates/pages/cart/cart.html';
  static element: HTMLElement = document.createElement('section');
  static render(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element!.outerHTML = html;
        });
    }

    return this.element;
  }
}
