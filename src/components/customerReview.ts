import { IReview } from '../interfaces/review';
import IUser from '../interfaces/users';

export default class CustomerReview {
  url: string;
  element: HTMLElement;
  customerReview: IReview;
  customer: IUser;
  constructor(customerReview: IReview, customer: IUser) {
    this.url = '/assets/templates/components/customer-review.html';
    this.element = document.createElement('div');
    this.customer = customer;
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
    customerImage!.setAttribute(
      'src',
      this.customer.imageSrc || '/assets/images/user.jpg',
    );
    customerImage!.setAttribute(
      'alt',
      `Profile picture of ${this.customer.name}`,
    );

    const customerName = this.element.querySelector(
      '.customer-review__customer-name',
    );
    customerName!.innerHTML = this.customer.name;

    const reviewDescription = this.element.querySelector(
      '.customer-review__comment',
    );
    reviewDescription!.innerHTML = this.customerReview.comment;

    const postedDate = this.element.querySelector(
      '.customer-review__posted-date',
    );
    postedDate!.innerHTML = new Date(
      this.customerReview.updatedAt,
    ).toDateString();
  }
}
