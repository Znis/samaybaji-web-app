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
        });
    }
    return this.element;
  }
}
