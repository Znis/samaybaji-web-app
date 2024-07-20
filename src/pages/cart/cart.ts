import CartItem from '../../components/cartItem';
import MenuItem from '../../components/menuItem';

export default class Cart {
  static htmlTemplateurl = './assets/templates/pages/cart/cart.html';
  static element: HTMLElement = document.createElement('section');
  static cartList: CartItem[] = [];
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
    this.render();
  }
  static removeItem(menuItem: MenuItem) {
    const cartItem = this.cartList.find((item) => item.id === menuItem.id);
    this.cartList = this.cartList.filter((item) => item.id !== menuItem.id);
    cartItem!.deleteItem();
  }
}
