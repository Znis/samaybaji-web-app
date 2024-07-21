import Cart from '../pages/cart/cart';
import MenuItem from './menuItem';

export default class CartItem {
  url: string;
  element: HTMLElement;
  menuItem: MenuItem;
  totalPrice: number;
  incrementButton: HTMLButtonElement;
  decrementButton: HTMLButtonElement;
  deleteButton: HTMLButtonElement;

  constructor(menuItem: MenuItem) {
    this.url = './assets/templates/components/cart-item.html';
    this.element = document.createElement('div');
    this.menuItem = menuItem;
    this.totalPrice = this.menuItem.price;

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
    cartImage!.src = this.menuItem.imgSrc;
    cartImage!.alt = `An image of ${this.menuItem.itemName}`;
    const titleElement = this.element.querySelector(
      '#cart-item-title',
    ) as HTMLElement;
    titleElement!.innerHTML = this.menuItem.itemName;
    const unitPriceElement = this.element.querySelector(
      '#cart-item-unit-price',
    );
    unitPriceElement!.innerHTML = `Rs. ${this.menuItem.price}`;
    const totalPriceElement = this.element.querySelector(
      '#cart-item-total-price',
    );
    totalPriceElement!.innerHTML = `Rs. ${this.menuItem.price}`;
    this.decrementButton = this.element.querySelector(
      '.cart-item__quantity-semi-rounded-left',
    ) as HTMLButtonElement;
    this.decrementButton.disabled = true;
    this.incrementButton = this.element.querySelector(
      '.cart-item__quantity-semi-rounded-right',
    ) as HTMLButtonElement;
    this.deleteButton = this.element.querySelector(
      '.cart-item__trash-button',
    ) as HTMLButtonElement;
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
      quantityBox.innerText = quantity.toString();
      this.updateTotalPrice(quantity);
    }

    if (quantity === 1) this.decrementButton.disabled = true;

    Cart.updateTotalPrice();
  }

  incrementQuantity(): void {
    const quantityBox = this.element.querySelector(
      '.cart-item__quantity-small-rounded-box',
    ) as HTMLElement;
    let quantity = parseInt(quantityBox.innerText);
    quantity++;
    quantityBox.innerText = quantity.toString();
    this.decrementButton.disabled = false;
    this.updateTotalPrice(quantity);
    Cart.updateTotalPrice();
  }

  updateTotalPrice(quantity: number): void {
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
    this.totalPrice = totalPrice;

    totalPriceElement.innerText = `Rs. ${totalPrice}`;
  }

  deleteItem(): void {
    Cart.removeItem(this.menuItem);
  }
}
