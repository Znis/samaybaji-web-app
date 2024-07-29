import CustomerReview from '../../../components/customerReview';
import { IReview } from '../../../interfaces/review';
import IUser from '../../../interfaces/users';

export default class DishReview {
  static htmlTemplateURL =
    '/assets/templates/pages/dish-detail/section/dish-review.html';
  static element = document.createElement('section');

  static init(dishReviews: IReview[]): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dish-review');
          this.element.innerHTML = html;
          this.setEventListeners();
          this.render(dishReviews);
        });
    }
    return this.element;
  }
  static render(dishReviews: IReview[]) {
    dishReviews.forEach((dishReview) => {
      const customerReview = new CustomerReview(dishReview, {} as IUser);
      this.element
        .querySelector('.dish-review__customer-reviews')!
        .appendChild(customerReview.element);
    });
  }
  static setEventListeners() {
    const toggleButton = this.element.querySelector(
      '#add-review-toggle-button',
    );
    const postButton = this.element.querySelector('#post-review-button');
    const reviewInputBox = this.element.querySelector(
      '.dish-review__review-inputbox',
    );
    const reviewContainer = this.element.querySelector(
      '.dish-review__review-input-wrapper',
    );

    if (toggleButton && reviewInputBox && reviewContainer && postButton) {
      toggleButton.addEventListener('click', () => {
        reviewInputBox.classList.toggle('visible');
        postButton.classList.toggle('visible');
        if (toggleButton.innerHTML === 'Add Review') {
          toggleButton.innerHTML = 'Cancel';
        } else {
          toggleButton.innerHTML = 'Add Review';
        }
      });
    }
  }
}
