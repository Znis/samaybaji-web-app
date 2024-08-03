import { IDish } from './../../../../interfaces/dish';
import { fetchRestaurantOrders } from '../../../../api-routes/order';
import { editOrderItem } from '../../../../api-routes/orderItem';
import { makeApiCall } from '../../../../apiCalls';
import { Accordion } from '../../../../components/accordion';
import { OrderItemStatus, OrderStatus } from '../../../../enums/order';
import IMenuItem from '../../../../interfaces/menuItem';
import { IOrder } from '../../../../interfaces/order';
import { IOrderItem } from '../../../../interfaces/orderItem';

export default class RestaurantOrdersDashboard {
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
    const orders = await makeApiCall(fetchRestaurantOrders);
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

    const angleDownIcon = document.createElement('i');
    angleDownIcon.className =
      'fa-solid fa-angle-down accordion-header-trailing-icon';
    const statusSelect = document.createElement('select');
    statusSelect.classList.add('accordion-header-status-select');
    statusSelect.id = 'order-status-select';

    const options = [
      { value: OrderItemStatus.PENDING, text: OrderItemStatus.PENDING },
      { value: OrderItemStatus.COOKING, text: OrderItemStatus.COOKING },
      { value: OrderItemStatus.READY, text: OrderItemStatus.READY },
      { value: OrderItemStatus.DELIVERED, text: OrderItemStatus.DELIVERED },
      { value: OrderItemStatus.CANCELLED, text: OrderItemStatus.CANCELLED },
    ];

    options.forEach((optionData) => {
      const option = document.createElement('option');
      option.classList.add('accordion-status-select-option');
      option.value = optionData.value;
      option.textContent = optionData.text;

      statusSelect.appendChild(option);
    });
    statusSelect.value = status;
    if (
      status == OrderItemStatus.DELIVERED ||
      status == OrderItemStatus.CANCELLED ||
      status == OrderItemStatus.READY
    ) {
      statusSelect.disabled = true;
    }
    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('accordion-header-icon-wrapper');
    iconWrapper.appendChild(statusSelect);
    iconWrapper.appendChild(angleDownIcon);
    accordionHeader.appendChild(iconWrapper);
    return accordionHeader;
  }

  static async initialiseAccordionContent() {
    const accordionContent = document.createElement('div');
    accordionContent.className = 'accordion-content';
    const templateUrl =
      '/assets/templates/components/order-item-accordion-content.html';

    await fetch(templateUrl)
      .then((response) => response.text())
      .then((html) => {
        accordionContent.innerHTML = html;
      });
    return accordionContent;
  }
  static async renderAccordionContent(orderItemSummary: {
    [key: string]: string;
  }) {
    const accordionContent = await this.initialiseAccordionContent();
    const orderItemCustomerName = accordionContent.querySelector(
      '#order-summary-customer-name',
    ) as HTMLSpanElement;
    orderItemCustomerName.innerHTML = `${orderItemSummary.customerName || ''}`;
    const orderItemName = accordionContent.querySelector(
      '#order-summary-name',
    ) as HTMLSpanElement;
    orderItemName.innerHTML = `${orderItemSummary.name || ''}`;
    const orderItemDate = accordionContent.querySelector(
      '#order-summary-date',
    ) as HTMLSpanElement;
    orderItemDate.innerHTML = `${orderItemSummary.date || ''}`;
    const orderItemTime = accordionContent.querySelector(
      '#order-summary-time',
    ) as HTMLSpanElement;
    orderItemTime.innerHTML = `${orderItemSummary.time || ''}`;
    const orderItemQuantity = accordionContent.querySelector(
      '#order-summary-quantity',
    ) as HTMLSpanElement;
    orderItemQuantity.innerHTML = `${orderItemSummary.quantity || ''}`;
    const orderItemPrice = accordionContent.querySelector(
      '#order-summary-price',
    ) as HTMLSpanElement;
    orderItemPrice.innerHTML = `${orderItemSummary.price || ''}`;

    return accordionContent;
  }
  static accordionContentEventListener(accordionHeader: HTMLDivElement) {}
  static accordionHeaderEventListener(
    accordionHeader: HTMLDivElement,
    orderItemId: string,
  ) {
    const selectStatus = this.element.querySelector(
      '#order-status-select',
    ) as HTMLSelectElement;
    selectStatus.addEventListener('change', async (event) => {
      event?.stopPropagation();
      let editStatus;
      if (selectStatus.value == 'cooking') {
        editStatus = { status: OrderItemStatus.COOKING };
      } else if (selectStatus.value == 'ready') {
        editStatus = { status: OrderItemStatus.READY };
      } else if (selectStatus.value == 'cancelled') {
        editStatus = { status: OrderItemStatus.CANCELLED };
      } else if (selectStatus.value == 'delivered') {
        editStatus = { status: OrderItemStatus.DELIVERED };
      } else {
        editStatus = { status: OrderItemStatus.PENDING };
      }
      const updateStatusResponse = await makeApiCall(
        editOrderItem,
        editStatus,
        orderItemId,
      );
      RestaurantOrdersDashboard.fetchAllOrders();
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
    orders.sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
    );
    orders.forEach(async (order) => {
      const item = order.orderItems as unknown as {
        menuItemData: IMenuItem;
        quantity: number;
        unitPrice: number;
        status: string;
        id: string;
        menuItemId: string;
      };
      const orderItemSummary = {
        customerName: order.customerName,
        name: item.menuItemData.name,
        quantity: item.quantity.toString(),
        price: (item.unitPrice * item.quantity).toString(),
        date: new Date(order.orderDate).toDateString(),
        time: order.orderTime,
      };
      const heading = `${item.menuItemData.name} x${item.quantity}` || 'Order Item Deleted';

      const accordionContentElement =
        await this.renderAccordionContent(orderItemSummary);
      const accordionHeaderElement = this.createAccordionHeader(
        item.status,
        heading,
      );
      const accordionHeaderEventListener = this.accordionHeaderEventListener;
      const accordionContentEventListener = this.accordionContentEventListener;
      const accordionHeader = {
        element: accordionHeaderElement,
        eventListeners: accordionHeaderEventListener,
        params: item.id,
      };
      const accordionContent = {
        element: accordionContentElement,
        eventListeners: accordionContentEventListener,
      };

      const accordion = new Accordion(accordionContent, accordionHeader);
      const activeOrderContainer = this.element.querySelector('#active-orders');
      const historyOrderContainer =
        this.element.querySelector('#history-orders');
      console.log(item.status);
      if (
        item.status == OrderItemStatus.READY ||
        item.status == OrderItemStatus.DELIVERED ||
        item.status == OrderItemStatus.CANCELLED
      ) {
        historyOrderContainer!.appendChild(accordion.element);
      } else {
        activeOrderContainer!.appendChild(accordion.element);
      }
    });
  }
}
