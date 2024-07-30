import { OrderStatus } from '../enums/order';

export class Accordion {
  element: HTMLElement;
  htmlTemplateUrl: string;
  orderSummary: { [key: string]: string };
  status: OrderStatus;
  orderItemsName: string;
  constructor(
    orderSummary: { [key: string]: string },
    orderItemsName: string,
    status: OrderStatus,
  ) {
    this.element = document.createElement('div');
    this.htmlTemplateUrl = '/assets/templates/components/order-accordion.html';
    this.orderSummary = orderSummary;
    this.status = status;
    this.orderItemsName = orderItemsName;
    this.init();
  }

  init() {
    if (this.element) {
      fetch(this.htmlTemplateUrl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('order__accordion-item');
          this.element.innerHTML = html;
          this.setEventListeners();
          this.render();
          this.renderAccordion();
        });
    }
    return this.element;
  }
  renderAccordion(): void {
    const accordionHeaders = this.element.querySelectorAll(
      '.order__accordion-header',
    );

    accordionHeaders.forEach((header, idx) => {
      const accordionItem = header.parentElement;
      const accordionContent = accordionItem!.querySelector(
        '.order__accordion-content',
      ) as HTMLDivElement;
      header.addEventListener('click', () => {
        header.classList.toggle('active');
        accordionContent.classList.toggle('open');
      });
    });
  }
  setEventListeners() {
    const deleteOrder = this.element.querySelector(
      '#delete-order',
    ) as HTMLButtonElement;
    deleteOrder.addEventListener('click', () => {
      console.log('delete-order');
    });
    const cancelOrder = this.element.querySelector(
      '#cancel-order',
    ) as HTMLButtonElement;
    cancelOrder.addEventListener('click', () => {
      console.log('order-cancel');
    });
  }
  render() {
    const orderAccordionTitle = this.element.querySelector(
      '.order__accordion-title',
    );
    orderAccordionTitle!.innerHTML = `${this.orderItemsName || ''}`;
    const deleteOrder = this.element.querySelector(
      '#delete-order',
    ) as HTMLButtonElement;
    const cancelOrder = this.element.querySelector(
      '#cancel-order',
    ) as HTMLButtonElement;
    if (
      this.status == OrderStatus.CANCELLED ||
      this.status == OrderStatus.DELIVERED
    ) {
      cancelOrder.style.display = 'none';
    } else {
      deleteOrder.style.display = 'none';
    }

    const orderSummaryName = this.element.querySelector(
      '#order-summary-name',
    ) as HTMLSpanElement;
    orderSummaryName.innerHTML = `${this.orderSummary.customerName || ''}`;
    const orderSummaryPhone = this.element.querySelector(
      '#order-summary-phone',
    ) as HTMLSpanElement;
    orderSummaryPhone.innerHTML = `${this.orderSummary.customerPhone || ''}`;
    const orderSummaryDate = this.element.querySelector(
      '#order-summary-date',
    ) as HTMLSpanElement;
    orderSummaryDate.innerHTML = `${this.orderSummary.orderDate || ''}`;
    const orderSummaryTime = this.element.querySelector(
      '#order-summary-time',
    ) as HTMLSpanElement;
    orderSummaryTime.innerHTML = `${this.orderSummary.orderTime || ''}`;
    const orderSummaryAddress = this.element.querySelector(
      '#order-summary-address',
    ) as HTMLSpanElement;
    orderSummaryAddress.innerHTML = `${this.orderSummary.deliveryAddress || ''}`;
    const orderSummaryPaymentMethod = this.element.querySelector(
      '#order-summary-payment-method',
    ) as HTMLSpanElement;
    orderSummaryPaymentMethod.innerHTML = `${this.orderSummary.paymentMethod || ''}`;
    const orderSummaryNote = this.element.querySelector(
      '#order-summary-note',
    ) as HTMLSpanElement;
    orderSummaryNote.innerHTML = `${this.orderSummary.notes || ''}`;
    const deliveryAmount = this.element.querySelector(
      '#order-summary-delivery-amount',
    ) as HTMLSpanElement;
    deliveryAmount.innerHTML = `${this.orderSummary.notes || ''}`;
    const subTotalAmount = this.element.querySelector(
      '#order-summary-sub-total-amount',
    ) as HTMLSpanElement;
    subTotalAmount.innerHTML = `${this.orderSummary.notes || ''}`;
    const totalAmount = this.element.querySelector(
      '#order-summary-total-amount',
    ) as HTMLSpanElement;
    totalAmount.innerHTML = `${this.orderSummary.notes || ''}`;
  }
}
