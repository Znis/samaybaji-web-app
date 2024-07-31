import {
  addCartItem,
  clearCart,
  fetchCartItems,
  makeApiCall,
  removeCartItem,
} from '../../apiCalls';
import CartItem from '../../components/cartItem';
import { LoaderSpinner } from '../../components/loaderSpinner';
import { IFormattedCartItemData } from '../../interfaces/cartItem';
import { IMenuItem } from '../../interfaces/menuItem';
import { navigate } from '../../router';
import { StateManager } from '../../state-management/stateManager';

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
      if (StateManager.state.user) {
        this.fetchCartItems();
      } else {
        this.render();
        this.setEventListeners();
      }
    });
    return this.element;
  }
  static get innerElements() {
    return {
      checkoutButton: this.element.querySelector(
        '#checkout-button',
      ) as HTMLButtonElement,
      cartContainer: this.element.querySelector(
        '.cart__container',
      ) as HTMLDivElement,
      totalAmountDisplay: this.element.querySelector(
        '#total-amount',
      ) as HTMLDivElement,
      subTotalAmountDisplay: this.element.querySelector(
        '#sub-total-amount',
      ) as HTMLDivElement,
      discountAmountDisplay: this.element.querySelector(
        '#discount-amount',
      ) as HTMLDivElement,
      emptyCartImageWrapper: this.element.querySelector(
        '.cart__image-wrapper',
      ) as HTMLDivElement,
    };
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
    if (!StateManager.state.user || !StateManager.state.cart.length) {
      this.innerElements.checkoutButton.disabled = true;
      return;
    }
    this.innerElements.checkoutButton.disabled = false;
    this.innerElements.checkoutButton.addEventListener('click', () => {
      history.pushState(null, '', '/checkout');
      navigate('/checkout');
    });
  }
  static async fetchCartItems() {
    this.element.appendChild(this.spinner);
    try {
      if (StateManager.state.cart.length) {
        await makeApiCall(clearCart);
        await makeApiCall(
          addCartItem,
          StateManager.state.cart.map((item) => {
            return {
              quantity: item.quantity,
              menuItemID: item.menuItemData.id,
            };
          }),
        );
        StateManager.updateState('cart', []);
      }
      const cartItems = (await makeApiCall(
        fetchCartItems,
      )) as unknown as IFormattedCartItemData[];
      StateManager.updateState(
        'cart',
        cartItems.map((item) => {
          return {
            quantity: item.quantity,
            menuItemData: item.menuItemData,
          };
        }),
      );
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
    this.updatePrices();
    if (!StateManager.state.user || !StateManager.state.cart.length) {
      this.innerElements.checkoutButton.disabled = true;
    } else {
      this.innerElements.checkoutButton.disabled = false;
    }
    if (!StateManager.state.cart.length) {
      this.innerElements.emptyCartImageWrapper.style.display = 'flex';
      return;
    }

    this.innerElements.emptyCartImageWrapper.style.display = 'none';
    this.cartItemArray = [];
    StateManager.state.cart.forEach((item) => {
      const cartItem = new CartItem(item);
      this.cartItemArray.push(cartItem);
    });
    this.innerElements.cartContainer.innerHTML = '';
    this.cartItemArray.forEach((item) => {
      this.innerElements.cartContainer.appendChild(item.element);
    });
    this.updatePriceDisplay();
  }

  static async addItem(menuItemData: IMenuItem) {
    StateManager.updateState('cart', [
      ...StateManager.state.cart,
      {
        quantity: 1,
        menuItemData: menuItemData,
      },
    ]);
    this.updatePrices();
    if (StateManager.state.user) {
      try {
        await makeApiCall(addCartItem, [
          {
            quantity: 1,
            menuItemID: menuItemData.id,
          },
        ]);
      } catch (error) {
        StateManager.updateState(
          'cart',
          StateManager.state.cart.filter(
            (item) => item.menuItemData.id !== menuItemData.id,
          ),
        );
        this.updatePrices();
      }
    }
  }

  static async removeItem(menuItemData: IMenuItem) {
    if (StateManager.state.user) {
      try {
        await makeApiCall(removeCartItem, menuItemData.id);
      } catch (error) {
        StateManager.updateState('cart', [
          ...StateManager.state.cart,
          {
            quantity: 1,
            menuItemData: menuItemData,
          },
        ]);
        this.updatePrices();
      }
    }
    StateManager.updateState(
      'cart',
      StateManager.state.cart.filter(
        (item) => item.menuItemData.id !== menuItemData.id,
      ),
    );
    this.updatePrices();
  }

  static updatePrices(): void {
    this.subTotalAmount = StateManager.state.cart.reduce(
      (sum, item) => sum + item.quantity * item.menuItemData.price,
      0,
    );
    this.discountAmount = StateManager.state.cart.length ? 50 : 0;
    this.totalAmount = this.subTotalAmount - this.discountAmount;
  }

  static updatePriceDisplay(): void {
    this.innerElements.subTotalAmountDisplay.innerHTML = `Rs. ${this.subTotalAmount}`;
    this.innerElements.totalAmountDisplay.innerHTML = `Rs. ${this.totalAmount}`;
    this.innerElements.discountAmountDisplay.innerHTML = `Rs. ${this.discountAmount}`;
  }
}
