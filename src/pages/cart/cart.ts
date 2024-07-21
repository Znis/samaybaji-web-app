import Header from '../../app-section/header';
import CartItem from '../../components/cartItem';
import MenuItem from '../../components/menuItem';

export default class Cart {
  static htmlTemplateurl = './assets/templates/pages/cart/cart.html';
  static element: HTMLElement = document.createElement('section');
  static cartList: CartItem[] = [];
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
        });
    }

    return this.element;
  }

  static render() {
    this.cartList.forEach((item) => {
      document.getElementById('cart-list')!.appendChild(item.element);
    });
  }

  static addItem(menuItem: MenuItem) {
    const cartItem = new CartItem(menuItem);
    this.cartList.push(cartItem);
    Header.updateCartCount();
    this.updateTotalPrice();
  }
  static removeItem(menuItem: MenuItem) {
    const cartItem = this.cartList.find((item) => item.id === menuItem.id);
    this.cartList = this.cartList.filter((item) => item.id !== menuItem.id);
    cartItem!.element.remove();
    menuItem.toggleButton();
    Header.updateCartCount();
    this.updateTotalPrice();
  }

  static updateTotalPrice() {
    console.log(this.cartList);
    this.subTotalAmount = 0;
    this.cartList.length
      ? (this.deliveryAmount = 100)
      : (this.deliveryAmount = 0);
    this.totalAmount = 0;
    this.cartList.forEach((item) => {
      this.subTotalAmount += item.totalPrice;
    });
    this.totalAmount = this.subTotalAmount + this.deliveryAmount;
    this.element.querySelector('#sub-total-amount')!.innerHTML =
      `Rs. ${this.subTotalAmount}`;
    this.element.querySelector('#delivery-amount')!.innerHTML =
      `Rs. ${this.deliveryAmount}`;
    this.element.querySelector('#total-amount')!.innerHTML =
      `Rs. ${this.totalAmount}`;
    this.render();
  }
}
