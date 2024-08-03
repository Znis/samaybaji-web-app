import {
  deleteOrder,
  editOrder,
  fetchUserOrders,
} from '../../../../api-routes/order';
import { makeApiCall } from '../../../../apiCalls';
import { Accordion } from '../../../../components/accordion';
import { OrderStatus } from '../../../../enums/order';
import { IEditOrder, IOrder } from '../../../../interfaces/order';
import { IOrderItem } from '../../../../interfaces/orderItem';

export default class CustomerOrdersDashboard {
  static element: HTMLElement = document.createElement('div');
  static htmlTemplateurl =
    '/assets/templates/pages/customer-dashboard/section/order.html';
  static html = '';
  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dashboard');
          this.html = html;
          this.fetchAllOrders();
        });
    }
    return this.element;
  }
  static async fetchAllOrders() {
    this.element.innerHTML = this.html;
    const orders = await makeApiCall(fetchUserOrders);
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
      'fa-solid fa-ban accordion-header-danger-action-icon';

    cancelOrderIcon.id = 'cancel-order';
    accordionHeader.appendChild(cancelOrderIcon);

    const deleteOrderIcon = document.createElement('i');
    deleteOrderIcon.className =
      'fa-solid fa-trash accordion-header-danger-action-icon';
    deleteOrderIcon.id = 'delete-order';
    const statusDiv = document.createElement('div');
    statusDiv.className = 'accordion-header-status';
    statusDiv.id = 'order-status';
    statusDiv.innerHTML = status;
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
    iconWrapper.appendChild(statusDiv);
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
    orderSummaryAddress.innerHTML = `${orderSummary.location || ''}`;
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
    deliveryAmount.innerHTML = `${orderSummary.deliveryAmount || ''}`;
    const subTotalAmount = accordionContent.querySelector(
      '#order-summary-sub-total-amount',
    ) as HTMLSpanElement;
    subTotalAmount.innerHTML = `${orderSummary.subTotalAmount || ''}`;
    const totalAmount = accordionContent.querySelector(
      '#order-summary-total-amount',
    ) as HTMLSpanElement;
    totalAmount.innerHTML = `${orderSummary.totalAmount || ''}`;
    return accordionContent;
  }
  static accordionHeaderEventListener(
    accordionHeader: HTMLDivElement,
    orderId: string,
  ) {
    const deleteButton = accordionHeader.querySelector('#delete-order');
    const cancelButton = accordionHeader.querySelector('#cancel-order');
    deleteButton!.addEventListener('click', async (event) => {
      event.stopPropagation();
      await makeApiCall(deleteOrder, orderId);
      CustomerOrdersDashboard.fetchAllOrders();
    });
    cancelButton!.addEventListener('click', async (event) => {
      event.stopPropagation();

      await makeApiCall(
        editOrder,
        {
          status: OrderStatus.CANCELLED,
        } as IEditOrder,
        orderId,
      );
      CustomerOrdersDashboard.fetchAllOrders();
    });
  }
  static async render(orders: IOrder[]) {
    const activeOrderContainer = this.element.querySelector(
      '#active-orders',
    ) as HTMLDivElement;
    const historyOrderContainer = this.element.querySelector(
      '#history-orders',
    ) as HTMLDivElement;
    activeOrderContainer.innerHTML = '';
    historyOrderContainer.innerHTML = '';
    if (!orders.length) {
      activeOrderContainer!.innerHTML = `<h3>No active orders</h3>`;
      historyOrderContainer!.innerHTML = `<h3>No history orders</h3>`;
    }
    orders.forEach(async (order) => {
      const orderSummary = {
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        orderDate: new Date(order.orderDate).toDateString(),
        orderTime: order.orderTime,
        description: order.notes,
        location: order.deliveryAddress,
        totalAmount: order.totalAmount.toString(),
        subTotalAmount: order.subTotalAmount.toString(),
        deliveryAmount: order.deliveryAmount.toString(),
        paymentMethod: order.paymentMethod,
        status: order.status,
      };
      let heading = '';
      order.orderItems.forEach((item: IOrderItem) => {
        heading += `${item.menuItemData.name} x${item.quantity} `;
      });
      if (!heading) heading = 'Order Items Deleted';
      const accordionContentElement =
        await this.renderAccordionContent(orderSummary);
      const accordionHeaderElement = this.createAccordionHeader(
        order.status,
        heading,
      );
      const accordionHeaderEventListener = this.accordionHeaderEventListener;
      const accordionHeader = {
        element: accordionHeaderElement,
        eventListeners: accordionHeaderEventListener,
        params: order.id,
      };
      const accordionContent = {
        element: accordionContentElement,
        eventListeners: () => null,
      };

      const accordion = new Accordion(accordionContent, accordionHeader);
      const activeOrderContainer = this.element.querySelector('#active-orders');
      const historyOrderContainer =
        this.element.querySelector('#history-orders');
      if (
        order.status == OrderStatus.CANCELLED ||
        order.status == OrderStatus.DELIVERED
      ) {
        historyOrderContainer!.appendChild(accordion.element);
      } else {
        activeOrderContainer!.appendChild(accordion.element);
      }
    });
  }
}
