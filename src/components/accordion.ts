export class OrderAccordion {
  element: HTMLElement;
  htmlTemplateUrl: string;
  orderSummary: { [key: string]: string };
  constructor(orderSummary: { [key: string]: string }) {
    this.element = document.createElement('div');
    this.htmlTemplateUrl = '/assets/templates/components/order-accordion.html';
    this.orderSummary = orderSummary;
    this.init();
  }

  init() {
    if (this.element) {
      fetch(this.htmlTemplateUrl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('order__accordion-item');
          this.element.innerHTML = html;
          this.render();
        });
    }
    return this.element;
  }
  render() {
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
