import { editCartItem, makeApiCall } from '../apiCalls';
import { IFormattedCartItemData } from '../interfaces/cartItem';
import Cart from '../pages/cart/cart';
import { StateManagement } from '../state-management/stateManagement';

export default class CartItem {
  url: string;
  element: HTMLElement;
  cartItemData: IFormattedCartItemData;
  incrementButton: HTMLButtonElement;
  decrementButton: HTMLButtonElement;
  deleteButton: HTMLButtonElement;

  constructor(cartItemData: IFormattedCartItemData) {
    this.url = './assets/templates/components/cart-item.html';
    this.element = document.createElement('div');
    this.cartItemData = cartItemData;

    this.incrementButton = {} as HTMLButtonElement;
    this.decrementButton = {} as HTMLButtonElement;
    this.deleteButton = {} as HTMLButtonElement;

    this.init();
  }

  init(): void {
    if (this.element) {
      fetch(this.url)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('cart-item');
          this.element.innerHTML = html;
          this.render();
          this.setupEventListeners();
        });
    }
  }
  render(): void {
    const cartImage = this.element.querySelector(
      '.cart-item__image',
    ) as HTMLImageElement;
    cartImage!.src = this.cartItemData.menuItemData.imageSrc;
    cartImage!.alt = `An image of ${this.cartItemData.menuItemData.name}`;
    const titleElement = this.element.querySelector(
      '#cart-item-title',
    ) as HTMLElement;
    titleElement!.innerHTML = this.cartItemData.menuItemData.name;
    const unitPriceElement = this.element.querySelector(
      '#cart-item-unit-price',
    );
    unitPriceElement!.innerHTML = `Rs. ${this.cartItemData.menuItemData.price}`;
    const totalPriceElement = this.element.querySelector(
      '#cart-item-total-price',
    );
    totalPriceElement!.innerHTML = `Rs. ${this.cartItemData.menuItemData.price}`;
    this.decrementButton = this.element.querySelector(
      '.cart-item__quantity-semi-rounded-left',
    ) as HTMLButtonElement;
    this.decrementButton.disabled =
      this.cartItemData.quantity === 1 ? true : false;
    this.incrementButton = this.element.querySelector(
      '.cart-item__quantity-semi-rounded-right',
    ) as HTMLButtonElement;
    this.deleteButton = this.element.querySelector(
      '.cart-item__trash-button',
    ) as HTMLButtonElement;
    const quantityBox = this.element.querySelector(
      '.cart-item__quantity-small-rounded-box',
    ) as HTMLElement;
    quantityBox.innerText = `${this.cartItemData.quantity}`;
  }
  setupEventListeners(): void {
    this.decrementButton?.addEventListener('click', () =>
      this.decrementQuantity(),
    );
    this.incrementButton?.addEventListener('click', () =>
      this.incrementQuantity(),
    );
    this.deleteButton?.addEventListener('click', () => this.deleteItem());
  }

  decrementQuantity(): void {
    const quantityBox = this.element.querySelector(
      '.cart-item__quantity-small-rounded-box',
    ) as HTMLElement;
    let quantity = parseInt(quantityBox.innerText);
    if (quantity > 1) {
      quantity--;
      quantityBox.innerText = `${quantity}`;
      this.updateTotalPrice(quantity);
    }

    if (quantity === 1) this.decrementButton.disabled = true;
  }

  incrementQuantity(): void {
    const quantityBox = this.element.querySelector(
      '.cart-item__quantity-small-rounded-box',
    ) as HTMLElement;
    let quantity = parseInt(quantityBox.innerText);
    quantity++;
    quantityBox.innerText = `${quantity}`;
    this.decrementButton.disabled = false;
    this.updateTotalPrice(quantity);
  }

  async updateTotalPrice(quantity: number) {
    const unitPriceElement = this.element.querySelector(
      '.cart-item__unit-price',
    ) as HTMLElement;
    const totalPriceElement = this.element.querySelector(
      '.cart-item__total-price',
    ) as HTMLElement;

    const unitPrice = parseFloat(
      unitPriceElement.innerText.replace('Rs. ', ''),
    );
    const totalPrice = unitPrice * quantity;
    this.cartItemData.quantity = quantity;
    totalPriceElement.innerText = `Rs. ${totalPrice}`;

    const cartItem = StateManagement.state.cart.find(
      (item) => item.menuItemData.id === this.cartItemData.menuItemData.id,
    );
    cartItem!.quantity = quantity;
    StateManagement.updateState('cart', StateManagement.state.cart);

    Cart.updatePrices();
    Cart.render();
    if (StateManagement.state.user) {
      try {
        await makeApiCall(editCartItem, this.cartItemData.menuItemData.id, {
          quantity: quantity,
        });
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  }

  deleteItem(): void {
    Cart.removeItem(this.cartItemData.menuItemData);
    Cart.updatePrices();
    Cart.render();
  }
}
