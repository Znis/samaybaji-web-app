import { ICustomerReviewData } from '../interfaces/dishDetail';

export default class CustomerReview {
  url: string;
  element: HTMLElement;
  customerReview: ICustomerReviewData;
  constructor(customerReview: ICustomerReviewData) {
    this.url = './assets/templates/components/customer-review.html';
    this.element = document.createElement('div');
    this.customerReview = customerReview;

    this.init();
  }

  init(): void {
    if (this.element) {
      fetch(this.url)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('customer-review');
          this.element.innerHTML = html;
          this.render();
        });
    }
  }

  render(): void {
    const customerImage = this.element.querySelector('.customer-review__image');
    customerImage!.setAttribute('src', this.customerReview.profileImgSrc);
    customerImage!.setAttribute(
      'alt',
      `Profile picture of ${this.customerReview.name}`,
    );

    const customerName = this.element.querySelector(
      '.customer-review__customer-name',
    );
    customerName!.textContent = this.customerReview.name;

    const reviewDescription = this.element.querySelector(
      '.customer-review__comment',
    );
    reviewDescription!.textContent = this.customerReview.comment;

    const postedDate = this.element.querySelector(
      '.customer-review__posted-date',
    );
    postedDate!.textContent = this.customerReview.postedDate;
  }
}
