import {
  addCartItem,
  clearCart,
  fetchCartItems,
  makeApiCall,
  removeCartItem,
} from '../../apiCalls';
import CartItem from '../../components/cartItem';
import { LoaderSpinner } from '../../components/loaderSpinner';
import ICartItem, { IFormattedCartItemData } from '../../interfaces/cartItem';
import { IMenuItem } from '../../interfaces/menuItem';
import { navigate } from '../../router';
import { StateManagement } from '../../state-management/stateManagement';

export default class Cart {
  static htmlTemplateUrl = './assets/templates/pages/cart/cart.html';
  static element: HTMLElement = document.createElement('section');
  static totalAmount = 0;
  static discountAmount = 50;
  static subTotalAmount = 0;
  static spinner = LoaderSpinner.render(50);
  static html = '';
  static cartItemArray: CartItem[] = [];
  static init(): HTMLElement {
    this.element.classList.add('cart');
    this.loadHtmlTemplate().then((html) => {
      this.html = html;
      this.element.innerHTML = '';
      if (StateManagement.state.user) {
        this.fetchCartItems();
      } else {
        this.initialiseCartItemArray();
        this.render();
        this.setEventListeners();
      }
    });
    return this.element;
  }
  static initialiseCartItemArray() {
    this.cartItemArray = [];
    StateManagement.state.cart.forEach((item) => {
      const cartItem = new CartItem(item);
      this.cartItemArray.push(cartItem);
    });
  }
  static async loadHtmlTemplate(): Promise<string> {
    try {
      const response = await fetch(this.htmlTemplateUrl);
      return await response.text();
    } catch (error) {
      console.error('Failed to load HTML template', error);
      return '<h3>Failed to load the cart template.</h3>';
    }
  }
  static setEventListeners() {
    const checkoutButton = this.element.querySelector(
      '#checkout-button',
    ) as HTMLButtonElement;
    if (!StateManagement.state.user || !StateManagement.state.cart.length) {
      checkoutButton.disabled = true;
      return;
    }
    checkoutButton.disabled = false;
    checkoutButton.addEventListener('click', () => {
      history.pushState(null, '', '/checkout');
      navigate('/checkout');
    });
  }
  static async fetchCartItems() {
    this.element.appendChild(this.spinner);
    try {
      if (StateManagement.state.cart.length) {
        await makeApiCall(clearCart);
        await makeApiCall(
          addCartItem,
          StateManagement.state.cart.map((item) => {
            return { quantity: item.quantity, menuItemID: item.menuItem.id };
          }),
        );
        StateManagement.updateState('cart', []);
      }
      const cartItems = (await makeApiCall(
        fetchCartItems,
      )) as unknown as IFormattedCartItemData[];
      StateManagement.updateState(
        'cart',
        cartItems.map((item) => {
          return {
            quantity: item.quantity,
            menuItem: item.menuItemData,
          };
        }),
      );
      this.initialiseCartItemArray();
      this.render();
      this.setEventListeners();
    } catch (error) {
      this.element.innerHTML = `<h3>${error}</h3>`;
    } finally {
      this.spinner.remove();
    }
  }
  static render(): void {
    this.element.innerHTML = this.html;

    const emptyCartImageWrapper = this.element.querySelector(
      '.cart__image-wrapper',
    ) as HTMLDivElement;
    this.updatePrices();

    if (!StateManagement.state.cart.length) {
      emptyCartImageWrapper.style.display = 'flex';
      return;
    }
    emptyCartImageWrapper.style.display = 'none';
    this.element.querySelector('.cart__container')!.innerHTML = '';
    this.cartItemArray.forEach((item) => {
      this.element.querySelector('.cart__container')!.appendChild(item.element);
    });
    this.updatePriceDisplay();
  }

  static async addItem(menuItemData: IMenuItem) {
    StateManagement.updateState('cart', [
      ...StateManagement.state.cart,
      {
        quantity: 1,
        menuItem: menuItemData,
      },
    ]);
    this.updatePrices();
    if (StateManagement.state.user) {
      try {
        await makeApiCall(addCartItem, [
          {
            quantity: 1,
            menuItemID: menuItemData.id,
          },
        ]);
      } catch (error) {
        StateManagement.updateState(
          'cart',
          StateManagement.state.cart.filter(
            (item) => item.menuItem.id !== menuItemData.id,
          ),
        );
        this.updatePrices();
      }
    }
  }

  static async removeItem(menuItemData: IMenuItem) {
    StateManagement.updateState(
      'cart',
      StateManagement.state.cart.filter(
        (item) => item.menuItem.id !== menuItemData.id,
      ),
    );
    this.updatePrices();
    if (StateManagement.state.user) {
      try {
        await makeApiCall(removeCartItem, menuItemData.id);
      } catch (error) {
        StateManagement.updateState('cart', [
          ...StateManagement.state.cart,
          {
            quantity: 1,
            menuItem: menuItemData,
          },
        ]);
        this.updatePrices();
      }
    }
  }

  static updatePrices(): void {
    this.subTotalAmount = StateManagement.state.cart.reduce(
      (sum, item) => sum + item.quantity * item.menuItem.price,
      0,
    );
    this.discountAmount = StateManagement.state.cart.length ? 50 : 0;
    this.totalAmount = this.subTotalAmount - this.discountAmount;
  }

  static updatePriceDisplay(): void {
    this.element.querySelector('#sub-total-amount')!.innerHTML =
      `Rs. ${this.subTotalAmount}`;
    this.element.querySelector('#discount-amount')!.innerHTML =
      `Rs. ${this.discountAmount}`;
    this.element.querySelector('#total-amount')!.innerHTML =
      `Rs. ${this.totalAmount}`;
  }
}
