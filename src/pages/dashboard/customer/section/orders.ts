import { fetchAllOrders, makeApiCall } from '../../../../apiCalls';
import { Accordion } from '../../../../components/accordion';
import { OrderStatus } from '../../../../enums/order';
import { IOrder } from '../../../../interfaces/order';
import { IOrderItem } from '../../../../interfaces/orderItem';

export default class CustomerOrdersDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/order.html';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard');
          this.element.innerHTML = html;
          this.fetchAllOrders();
        });
    }
    return this.element;
  }
  static async fetchAllOrders() {
    const orders = await makeApiCall(fetchAllOrders);
    console.log(orders);
    this.render(orders as unknown as IOrder[]);
  }
  static createAccordionHeader(status: string, heading: string) {
    const accordionHeader = document.createElement('div');
    accordionHeader.className = 'accordion-header';

    const accordionTitleWrapper = document.createElement('div');
    accordionTitleWrapper.className = 'accordion-title-wrapper';

    const checkIcon = document.createElement('i');
    checkIcon.className = 'fa-solid fa-circle-check accordion-header-icon';
    accordionTitleWrapper.appendChild(checkIcon);

    const accordionTitle = document.createElement('p');
    accordionTitle.className = 'accordion-title';
    accordionTitle.innerText = heading;
    accordionTitleWrapper.appendChild(accordionTitle);

    accordionHeader.appendChild(accordionTitleWrapper);

    const cancelOrderIcon = document.createElement('i');
    cancelOrderIcon.className =
      'fa-solid fa-angle-down accordion-header-action-icon';

    cancelOrderIcon.id = 'cancel-order';
    accordionHeader.appendChild(cancelOrderIcon);

    const deleteOrderIcon = document.createElement('i');
    deleteOrderIcon.className =
      'fa-solid fa-check accordion-header-action-icon';
    deleteOrderIcon.id = 'delete-order';
    accordionHeader.appendChild(deleteOrderIcon);
    if (status == OrderStatus.CANCELLED || status == OrderStatus.DELIVERED) {
      cancelOrderIcon.style.display = 'none';
    } else {
      deleteOrderIcon.style.display = 'none';
    }
    const angleDownIcon = document.createElement('i');
    angleDownIcon.className =
      'fa-solid fa-angle-down accordion-header-trailing-icon';

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('accordion-header-icon-wrapper');
    iconWrapper.appendChild(deleteOrderIcon);
    iconWrapper.appendChild(cancelOrderIcon);
    iconWrapper.appendChild(angleDownIcon);
    accordionHeader.appendChild(iconWrapper);
    return accordionHeader;
  }

  static async initialiseAccordionContent() {
    const accordionContent = document.createElement('div');
    accordionContent.className = 'accordion-content';
    const templateUrl =
      '/assets/templates/components/order-accordion-content.html';

    await fetch(templateUrl)
      .then((response) => response.text())
      .then((html) => {
        accordionContent.innerHTML = html;
      });
    return accordionContent;
  }
  static async renderAccordionContent(orderSummary: { [key: string]: string }) {
    const accordionContent = await this.initialiseAccordionContent();
    const orderSummaryName = accordionContent.querySelector(
      '#order-summary-name',
    ) as HTMLSpanElement;
    orderSummaryName.innerHTML = `${orderSummary.customerName || ''}`;
    const orderSummaryPhone = accordionContent.querySelector(
      '#order-summary-phone',
    ) as HTMLSpanElement;
    orderSummaryPhone.innerHTML = `${orderSummary.customerPhone || ''}`;
    const orderSummaryDate = accordionContent.querySelector(
      '#order-summary-date',
    ) as HTMLSpanElement;
    orderSummaryDate.innerHTML = `${orderSummary.orderDate || ''}`;
    const orderSummaryTime = accordionContent.querySelector(
      '#order-summary-time',
    ) as HTMLSpanElement;
    orderSummaryTime.innerHTML = `${orderSummary.orderTime || ''}`;
    const orderSummaryAddress = accordionContent.querySelector(
      '#order-summary-address',
    ) as HTMLSpanElement;
    orderSummaryAddress.innerHTML = `${orderSummary.deliveryAddress || ''}`;
    const orderSummaryPaymentMethod = accordionContent.querySelector(
      '#order-summary-payment-method',
    ) as HTMLSpanElement;
    orderSummaryPaymentMethod.innerHTML = `${orderSummary.paymentMethod || ''}`;
    const orderSummaryNote = accordionContent.querySelector(
      '#order-summary-note',
    ) as HTMLSpanElement;
    orderSummaryNote.innerHTML = `${orderSummary.notes || ''}`;
    const deliveryAmount = accordionContent.querySelector(
      '#order-summary-delivery-amount',
    ) as HTMLSpanElement;
    deliveryAmount.innerHTML = `${orderSummary.notes || ''}`;
    const subTotalAmount = accordionContent.querySelector(
      '#order-summary-sub-total-amount',
    ) as HTMLSpanElement;
    subTotalAmount.innerHTML = `${orderSummary.notes || ''}`;
    const totalAmount = accordionContent.querySelector(
      '#order-summary-total-amount',
    ) as HTMLSpanElement;
    totalAmount.innerHTML = `${orderSummary.notes || ''}`;
    return accordionContent;
  }
  static accordionContentEventListener(accordionHeader: HTMLDivElement) {
    const totalAmount = accordionHeader.querySelector(
      '#order-summary-total-amount',
    ) as HTMLSpanElement;
    totalAmount.addEventListener('click', () => {
      console.log('clicked');
    });
  }
  static accordionHeaderEventListener(accordionHeader: HTMLDivElement) {
    const deleteButton = accordionHeader.querySelector('#delete-order');
    const cancelButton = accordionHeader.querySelector('#cancel-order');
    deleteButton!.addEventListener('click', () => {
      console.log('delete-order');
    });
    cancelButton!.addEventListener('click', () => {
      console.log('cancel-order');
    });
  }
  static async render(orders: IOrder[]) {
    orders.forEach(async (order) => {
      const orderSummary = {
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        orderDate: order.orderDate,
        orderTime: order.orderTime,
        description: order.notes,
        location: order.deliveryAddress,
        totalAmount: '3',
        subTotalAmount: '2',
        deliveryAmount: '1',
        paymentMethod: order.paymentMethod,
      };
      let heading = '';
      order.orderItems.forEach((item: IOrderItem) => {
        heading += `${item.menuItemID} x${item.quantity} `;
      });
      const accordionContentElement =
        await this.renderAccordionContent(orderSummary);
      const accordionHeaderElement = this.createAccordionHeader(
        order.status,
        heading,
      );
      const accordionHeaderEventListener = this.accordionHeaderEventListener;
      const accordionContentEventListener = this.accordionContentEventListener;
      const accordionHeader = {
        element: accordionHeaderElement,
        eventListeners: accordionHeaderEventListener,
      };
      const accordionContent = {
        element: accordionContentElement,
        eventListeners: accordionContentEventListener,
      };

      const accordion = new Accordion(accordionContent, accordionHeader);
      const activeOrderContainer = this.element.querySelector('#active-orders');
      const historyOrderContainer =
        this.element.querySelector('#history-orders');
      activeOrderContainer!.appendChild(accordion.element);
      historyOrderContainer!.appendChild(accordion.element);
    });
  }
}
