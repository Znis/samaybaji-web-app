import Header from '../../app-section/header';
import CartItem from '../../components/cartItem';
import MenuItem from '../../components/menuItem';

export default class Cart {
  static htmlTemplateurl = './assets/templates/pages/cart/cart.html';
  static element: HTMLElement = document.createElement('section');
  static cartList: CartItem[] = JSON.parse(localStorage.getItem('cart')!) || [];
  static totalAmount = 0;
  static deliveryAmount = 100;
  static subTotalAmount = 0;
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('cart');
          this.element.innerHTML = html;
          this.render();
        });
    }

    return this.element;
  }

  static render() {
    const emptyCartImageWrapper = this.element.querySelector(
      '.cart__image-wrapper',
    ) as HTMLDivElement;
    if (this.cartList.length) {
      emptyCartImageWrapper.style.display = 'none';
    } else {
      emptyCartImageWrapper.style.display = 'flex';
    }

    this.cartList.forEach((item) => {
      this.element.querySelector('.cart__container')!.appendChild(item.element);
    });
    this.element.querySelector('#sub-total-amount')!.innerHTML =
      `Rs. ${this.subTotalAmount}`;
    this.element.querySelector('#delivery-amount')!.innerHTML =
      `Rs. ${this.deliveryAmount}`;
    this.element.querySelector('#total-amount')!.innerHTML =
      `Rs. ${this.totalAmount}`;
  }

  static addItem(menuItem: MenuItem) {
    const cartItem = new CartItem(menuItem);
    this.cartList.push(cartItem);
    Header.updateCartCount();
    this.updateTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartList));
  }
  static removeItem(menuItem: MenuItem) {
    const cartItem = this.cartList.find(
      (item) => item.menuItem.id === menuItem.id,
    );
    this.cartList = this.cartList.filter(
      (item) => item.menuItem.id !== menuItem.id,
    );
    cartItem!.element.remove();
    menuItem.toggleButton();
    Header.updateCartCount();
    this.updateTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartList));
  }

  static updateTotalPrice() {
    this.subTotalAmount = 0;
    this.cartList.length
      ? (this.deliveryAmount = 100)
      : (this.deliveryAmount = 0);
    this.totalAmount = 0;
    this.cartList.forEach((item) => {
      this.subTotalAmount += item.quantity * item.menuItem.price;
    });
    this.totalAmount = this.subTotalAmount + this.deliveryAmount;
    this.render();
  }
}
