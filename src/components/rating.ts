export default class Rating {
  static htmlTemplateURL = './assets/templates/components/rating.html';
  static element = document.createElement('div');
  static init(id: string): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateURL)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('rating');
          this.element.setAttribute('id', id);
          this.element.innerHTML = html;
        });
    }
    return this.element;
  }
}
