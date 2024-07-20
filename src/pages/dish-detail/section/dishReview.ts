export default class DishReview {
  static htmlTemplateURL =
    './assets/templates/pages/dish-detail/section/dish-review.html';
  static element = document.createElement('section');

  static render(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element!.outerHTML = html;
        });
    }
    return this.element;
  }
}
