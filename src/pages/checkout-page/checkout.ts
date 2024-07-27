import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import CartItem from '../../components/cartItem';
import { LoaderSpinner } from '../../components/loaderSpinner';
import { StateManagement } from '../../state-management/stateManagement';
import CartItemCheckout from '../../components/cartItemCheckout';
import Cart from '../cart/cart';
import { navigate } from '../../router';

export default class Checkout {
  static htmlTemplateUrl =
    './assets/templates/pages/checkout-page/checkout-page.html';
  static element: HTMLElement = document.createElement('section');
  static totalAmount = 0;
  static deliveryAmount = 100;
  static subTotalAmount = Cart.subTotalAmount;
  static spinner = LoaderSpinner.render(50);
  static html = '';
  static cartItemArray: CartItem[] = [];
  static init(): HTMLElement {
    this.element.classList.add('cart');
    this.loadHtmlTemplate().then((html) => {
      this.html = html;
      this.element.innerHTML = '';
      this.render();
      this.renderAccordion();
      this.renderCartItems();
      this.setEventListeners();
    });
    return this.element;
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

  static render(): void {
    this.element.innerHTML = this.html;
    const input = this.element.querySelector(
      '#order-phone',
    ) as HTMLInputElement;
    intlTelInput(input, {
      initialCountry: 'np',
      onlyCountries: ['np'],
      utilsScript: "'node_modules/intl-tel-input/build/js/utils.js'",
    });
    const today = new Date().toISOString().split('T')[0];

    const dateInput = this.element.querySelector(
      '#order-date',
    ) as HTMLInputElement;

    dateInput.setAttribute('min', today);
    dateInput.value = today;
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

    const minTime = '09:00';
    const maxTime = '21:00';

    const timeInput = this.element.querySelector(
      '#order-time',
    ) as HTMLInputElement;

    timeInput.setAttribute('min', minTime);
    timeInput.setAttribute('max', maxTime);
    timeInput.setAttribute('value', time);
  }

  static renderAccordion(): void {
    const accordionHeaders = this.element.querySelectorAll(
      '.checkout__accordion-header',
    );

    accordionHeaders.forEach((header) => {
      header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = accordionItem!.querySelector(
          '.checkout__accordion-content',
        ) as HTMLDivElement;
        header.classList.toggle('active');
        accordionContent.classList.toggle('open');
      });
    });
  }
  static renderCartItems(): void {
    const cartItemContainer = this.element.querySelector(
      '.checkout__cart-container',
    ) as HTMLDivElement;
    StateManagement.state.cart.forEach((item) => {
      cartItemContainer.append(new CartItemCheckout(item).element);
    });
  }
  static renderOrderBilling(): void {
    const subTotalAmount = this.element.querySelector(
      '.order-billing__sub-total-amount',
    ) as HTMLParagraphElement;
    subTotalAmount.innerText = `Rs. ${this.subTotalAmount}`;
    const deliveryAmount = this.element.querySelector(
      '.order-billing__delivery-amount',
    ) as HTMLParagraphElement;
    deliveryAmount.innerText = `Rs. ${this.deliveryAmount}`;

    const totalAmount = this.element.querySelector(
      '.order-billing__total-amount',
    ) as HTMLParagraphElement;
    totalAmount.innerText = `Rs. ${this.subTotalAmount + this.deliveryAmount}`;
    const cartItemContainer = this.element.querySelector(
      '.checkout__cart-container',
    ) as HTMLDivElement;
    StateManagement.state.cart.forEach((item) => {
      cartItemContainer.append(new CartItemCheckout(item).element);
    });
  }
  static setEventListeners() {
    const editCartButton = this.element.querySelector(
      '#edit-cart-button',
    ) as HTMLButtonElement;
    editCartButton.addEventListener('click', () => {
      history.pushState(null, '', '/cart');
      navigate('/cart');
    });
  }
}
