import Rating from '../../../components/rating';

export default class DishInfo {
  static htmlTemplateURL =
    './assets/templates/pages/dish-detail/section/dish-info.html';
  static element = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('dish-info');
          this.element.innerHTML = html;
          const dishId = 1;
          document
            .getElementById('dish-rating')!
            .appendChild(Rating.init(`rating-id-${dishId}`));
        });
    }
    return this.element;
  }
}
