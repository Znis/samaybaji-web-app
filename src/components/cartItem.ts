import Cart from '../pages/cart/cart';
import MenuItem from './menuItem';

export default class CartItem {
  url: string;
  element: HTMLElement;
  id: string;
  menuItem: MenuItem;
  constructor(menuItem: MenuItem) {
    this.url = './assets/templates/components/cart-item.html';
    this.element = document.createElement('div');
    this.menuItem = menuItem;
    this.id = this.menuItem.id;

    this.init();
  }

  init(): void {
    if (this.element) {
      fetch(this.url)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('cart-item');
          this.element.setAttribute('id', this.id);
          this.element.innerHTML = html;
          this.setupEventListeners();
        });
    }
  }
  setupEventListeners(): void {
    const decrementButton = this.element.querySelector(
      '.cart-item__quantity-semi-rounded-left',
    ) as HTMLElement;
    const incrementButton = this.element.querySelector(
      '.cart-item__quantity-semi-rounded-right',
    ) as HTMLElement;
    const deleteButton = this.element.querySelector(
      '.cart-item__trash-button',
    ) as HTMLElement;

    decrementButton?.addEventListener(
      'click',
      this.decrementQuantity.bind(this),
    );
    incrementButton?.addEventListener(
      'click',
      this.incrementQuantity.bind(this),
    );
    deleteButton?.addEventListener('click', () =>
      Cart.removeItem(this.menuItem),
    );
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
  }

  incrementQuantity(): void {
    const quantityBox = this.element.querySelector(
      '.cart-item__quantity-small-rounded-box',
    ) as HTMLElement;
    let quantity = parseInt(quantityBox.innerText);
    quantity++;
    quantityBox.innerText = quantity.toString();
    this.updateTotalPrice(quantity);
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

    totalPriceElement.innerText = `Rs. ${totalPrice.toFixed(2)}`;
  }

  deleteItem(): void {
    this.element.remove();
    this.menuItem.toggleButton();
  }
}
