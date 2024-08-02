import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import CartItem from '../../components/cartItem';
import { LoaderSpinner } from '../../components/loaderSpinner';
import { StateManager } from '../../state-management/stateManager';
import CartItemCheckout from '../../components/cartItemCheckout';
import { navigate } from '../../router';
import { makeApiCall } from '../../apiCalls';
import { createOrder } from '../../api-routes/order';
import { clearCart } from '../../api-routes/cart';
import Toast from '../../components/toast';
import axios from 'axios';

export default class Checkout {
  static htmlTemplateUrl =
    './assets/templates/pages/checkout-page/checkout-page.html';
  static element: HTMLElement = document.createElement('section');
  static deliveryAmount = 100;
  static discountAmount = 0;
  static subTotalAmount = 0;
  static totalAmount = 0;
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
      this.renderOrderBilling();
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

    this.subTotalAmount = StateManager.state.cart.reduce(
      (acc, item) => acc + item.menuItemData.price * item.quantity,
      0,
    );
    this.totalAmount =
      this.subTotalAmount + this.deliveryAmount - this.discountAmount;
  }

  static renderAccordion(): void {
    const accordionHeaders = this.element.querySelectorAll(
      '.checkout__accordion-header',
    );

    accordionHeaders.forEach((header, idx) => {
      const accordionItem = header.parentElement;
      const accordionContent = accordionItem!.querySelector(
        '.checkout__accordion-content',
      ) as HTMLDivElement;
      if (idx === 0) {
        accordionContent.classList.add('open');
        header.classList.add('active');
      }
      header.addEventListener('click', () => {
        header.classList.toggle('active');
        accordionContent.classList.toggle('open');
      });
    });
  }
  static renderCartItems(): void {
    const cartItemContainer = this.element.querySelector(
      '.checkout__cart-container',
    ) as HTMLDivElement;
    cartItemContainer.innerHTML = '';
    StateManager.state.cart.forEach((item) => {
      const cartItem = new CartItemCheckout(item);
      cartItemContainer.append(cartItem.element);
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
  }
  static setEventListeners() {
    const editCartButton = this.element.querySelector(
      '#edit-cart-button',
    ) as HTMLButtonElement;
    const trackOrderButton = this.element.querySelector(
      '#track-order-button',
    ) as HTMLButtonElement;
    trackOrderButton.style.display = 'none';
    const successContainer = this.element.querySelector(
      '.checkout__success-container',
    ) as HTMLDivElement;
    successContainer.style.display = 'none';
    editCartButton.addEventListener('click', () => {
      history.pushState(null, '', '/cart');
      navigate('/cart');
    });
    const checkoutForm = this.element.querySelector(
      '#checkout-form',
    ) as HTMLFormElement;
    const confirmCheckoutButton = this.element.querySelector(
      '#confirm-order-button',
    ) as HTMLButtonElement;
    const errorMessage = this.element.querySelector(
      '.form__error-message',
    ) as HTMLParagraphElement;
    checkoutForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
      }
      const formData = new FormData(checkoutForm);
      const data = Object.fromEntries(formData.entries());

      const orderItems = StateManager.state.cart.map((item) => {
        return {
          menuItemId: item.menuItemData.id,
          quantity: item.quantity,
          unitPrice: item.menuItemData.price,
          notes: '',
        };
      });
  
      const order = {
        customerPhone: data['customer_phone'] as string,
        deliveryAddress: data['delivery_address'] as string,
        customerName: data['customer_name'] as string,
        notes: data['notes'] as string,
        orderDate: data['order_date'] as string,
        orderTime: data['order_time'] as string,
        paymentMethod: data['payment_method'] as string,
        subTotalAmount: this.subTotalAmount,
        totalAmount: this.totalAmount,
        deliveryAmount: this.deliveryAmount,
        discountAmount: this.discountAmount,
        orderItems: orderItems,
      };
      const spinner = LoaderSpinner.render(20);
      try {
        confirmCheckoutButton.appendChild(spinner);
        confirmCheckoutButton.disabled = true;
        const response = await makeApiCall(createOrder, order);
        await makeApiCall(clearCart);
        const trackOrderButton = this.element.querySelector(
          '#track-order-button',
        ) as HTMLButtonElement;
        trackOrderButton.style.display = 'flex';
        const submitOrderButton = this.element.querySelector(
          '#confirm-order-button',
        ) as HTMLButtonElement;
        submitOrderButton.style.display = 'none';

        const editOrderButton = this.element.querySelector(
          '#edit-cart-button',
        ) as HTMLButtonElement;
        editOrderButton.style.display = 'none';
        const checkoutAccordion = this.element.querySelector(
          '.checkout__accordion',
        ) as HTMLDivElement;
        checkoutAccordion.style.display = 'none';
        const successContainer = this.element.querySelector(
          '.checkout__success-container',
        ) as HTMLDivElement;
        successContainer.style.display = 'flex';
        window.scrollTo(0, 0);

        const orderSummaryName = this.element.querySelector(
          '#order-summary-name',
        ) as HTMLSpanElement;
        orderSummaryName.innerHTML = `${order.customerName || ''}`;
        const orderSummaryPhone = this.element.querySelector(
          '#order-summary-phone',
        ) as HTMLSpanElement;
        orderSummaryPhone.innerHTML = `${order.customerPhone || ''}`;
        const orderSummaryDate = this.element.querySelector(
          '#order-summary-date',
        ) as HTMLSpanElement;
        orderSummaryDate.innerHTML = `${order.orderDate || ''}`;
        const orderSummaryTime = this.element.querySelector(
          '#order-summary-time',
        ) as HTMLSpanElement;
        orderSummaryTime.innerHTML = `${order.orderTime || ''}`;
        const orderSummaryAddress = this.element.querySelector(
          '#order-summary-address',
        ) as HTMLSpanElement;
        orderSummaryAddress.innerHTML = `${order.deliveryAddress || ''}`;
        const orderSummaryPaymentMethod = this.element.querySelector(
          '#order-summary-payment-method',
        ) as HTMLSpanElement;
        orderSummaryPaymentMethod.innerHTML = `${order.paymentMethod || ''}`;
        const orderSummaryNote = this.element.querySelector(
          '#order-summary-note',
        ) as HTMLSpanElement;
        orderSummaryNote.innerHTML = `${order.notes || ''}`;
        errorMessage.innerHTML = '';

        trackOrderButton.addEventListener('click', () => {
          StateManager.updateState('cart', []);
          history.pushState(null, '', '/dashboard');
          navigate('/dashboard');
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorMessage.innerHTML = error.message;
          Toast.show('Checkout Failed');
        } else {
          errorMessage.innerHTML = 'An unexpected error occurred';
          Toast.show('An unexpected error occurred');
        }
      } finally {
        confirmCheckoutButton.removeChild(spinner);
        confirmCheckoutButton.disabled = false;
      }
    });
  }
}
