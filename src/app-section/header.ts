import AuthCard from '../components/authCard.ts';
import Modal from '../components/modal.ts';
import Cart from '../pages/cart/cart.ts';

export default class Header {
  static htmlTemplateURL = './assets/templates/app-section/header.html';
  static element: HTMLElement = document.createElement('header');

  static init(): HTMLElement {
    fetch(this.htmlTemplateURL)
      .then((response: Response) => response.text())
      .then((html: string) => {
        this.element.innerHTML = html;
        document
          .getElementById('authentication')
          ?.addEventListener('click', () => {
            Modal.toggle();
            document.getElementById('modal')!.appendChild(AuthCard.init());
          });
      });
    return this.element;
  }

  static updateCartCount() {
    const cartLength = Cart.cartList.length;
    const cartCountCircleDiv = this.element.querySelector(
      '#cart-count-circle',
    ) as HTMLDivElement;

    if (!cartLength) {
      cartCountCircleDiv.style.display = 'none';
      return;
    }

    cartCountCircleDiv.style.display = 'flex';
    this.element.querySelector('#cart-count')!.innerHTML =
      cartLength.toString();
  }
}
