import Rating from '../../../components/rating';

export default class DishInfo {
  static htmlTemplateURL =
    './assets/templates/pages/dish-detail/section/dish-info.html';
  static element = document.createElement('section');

  static render(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element!.outerHTML = html;
          const dishId = 1;
          document
            .getElementById('dish-rating')!
            .appendChild(Rating.render(`rating-id-${dishId}`));
        });
    }
    return this.element;
  }
}
