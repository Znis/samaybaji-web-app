import {
  fetchAllMenuItems,
  fetchAllOrders,
  makeApiCall,
} from '../../../apiCalls';
import { Accordion } from '../../../components/accordion';
import { OrderStatus } from '../../../enums/order';
import { IMenu } from '../../../interfaces/menu';
import { IMenuItem } from '../../../interfaces/menuItem';
import { IOrder } from '../../../interfaces/order';
import { IOrderItem } from '../../../interfaces/orderItem';
import { IReview } from '../../../interfaces/review';

export default class EditDetailsDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/edit-detail.html';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard');
          this.element.innerHTML = html;
          this.innerElements();
          this.render();
        });
    }
    return this.element;
  }

  static innerElements() {
    return {
      userEditDetailsForm: this.element.querySelector(
        '#user-edit-details',
      ) as HTMLFormElement,
      restaurantEditDetailsForm: this.element.querySelector(
        '#restaurant-edit-details',
      ) as HTMLFormElement,
      restaurantName: this.element.querySelector(
        '#restaurant-name',
      ) as HTMLInputElement,
      restaurantDescription: this.element.querySelector(
        '#restaurant-description',
      ) as HTMLTextAreaElement,
      userFullName: this.element.querySelector(
        '#user-fullname',
      ) as HTMLInputElement,
      userEmail: this.element.querySelector('#user-email') as HTMLInputElement,
      userPassword: this.element.querySelector(
        '#user-password',
      ) as HTMLInputElement,
      userConfirmPassword: this.element.querySelector(
        '#user-confirm-password',
      ) as HTMLInputElement,
      userPhoneNumber: this.element.querySelector(
        '#user-phone-number',
      ) as HTMLInputElement,
    };
  }

  static async render() {
    this.innerElements().restaurantEditDetailsForm.style.display = 'none';
  }
}
