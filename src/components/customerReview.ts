export default class CustomerReview {
  url: string;
  element: HTMLElement;
  id: string;
  constructor(id: string) {
    this.url = './assets/templates/components/customer-review.html';
    this.element = document.createElement('div');
    this.id = id;

    this.init();
  }

  init(): void {
    if (this.element) {
      fetch(this.url)
        .then((response) => response.text())
        .then((html) => {
          this.element.setAttribute('id', this.id);
          this.element.outerHTML = html;
        });
    }
  }
}
