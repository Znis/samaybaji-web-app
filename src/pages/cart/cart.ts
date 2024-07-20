import CartItem from '../../components/cartItem';

export default class Cart {
  static htmlTemplateurl = './assets/templates/pages/cart/cart.html';
  static element: HTMLElement = document.createElement('section');
  static render(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element!.outerHTML = html;
          for (let i = 0; i < 10; i++) {
            document
              .getElementById('cart-list')!
              .appendChild(new CartItem(`item-id-${i + 1}`).element);
          }
        });
    }

    return this.element;
  }
}
