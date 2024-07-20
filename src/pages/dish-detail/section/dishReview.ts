import CustomerReview from '../../../components/customerReview';

export default class DishReview {
  static htmlTemplateURL =
    './assets/templates/pages/dish-detail/section/dish-review.html';
  static element = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dish-review');
          this.element.innerHTML = html;
          for (let i = 0; i < 10; i++) {
            const customerReview = new CustomerReview(`review-id-${i + 1}`);
            document
              .getElementById('dish-customer-reviews')!
              .appendChild(customerReview.element);
          }
        });
    }
    return this.element;
  }
}
