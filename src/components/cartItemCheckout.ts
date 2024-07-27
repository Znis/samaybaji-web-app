import { ICartItemData } from '../interfaces/cart';
export default class CartItemCheckout {
  htmlTemplateUrl: string;
  element: HTMLElement;
  cartItemData: ICartItemData;
  constructor(cartItemData: ICartItemData) {
    this.htmlTemplateUrl =
      './assets/templates/components/cart-item-checkout.html';
    this.element = document.createElement('div');
    this.cartItemData = cartItemData;

    this.init();
  }

  init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateUrl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('cart-item', 'cart-item--small');
          this.element.innerHTML = html;
          this.render();
        });
    }
    return this.element;
  }
  render(): void {
    const cartImage = this.element.querySelector(
      '.cart-item__image',
    ) as HTMLImageElement;
    cartImage!.src = this.cartItemData.menuItem.imgSrc;
    cartImage!.alt = `An image of ${this.cartItemData.menuItem.name}`;
    const titleElement = this.element.querySelector(
      '#cart-item-title',
    ) as HTMLElement;
    titleElement!.innerHTML = this.cartItemData.menuItem.name;
    const unitPriceElement = this.element.querySelector(
      '#cart-item-unit-price',
    );
    unitPriceElement!.innerHTML = `Rs. ${this.cartItemData.menuItem.price}`;
    const totalPriceElement = this.element.querySelector(
      '#cart-item-total-price',
    );
    totalPriceElement!.innerHTML = `Rs. ${this.cartItemData.menuItem.price}`;
    const quantityElement = this.element.querySelector(
      '.cart-item__item-count',
    ) as HTMLElement;
    quantityElement.innerText = `x${this.cartItemData.quantity}`;
  }
}
