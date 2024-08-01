export default class ErrorPage {
  static htmlTemplateurl = '/assets/templates/pages/error-page/error-page.html';
  static element: HTMLElement = document.createElement('section');
  static html = '';

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('error-page');
          this.html = html;
          this.render();
        });
    }

    return this.element;
  }
  static render() {
    this.element.innerHTML = this.html;
    const errorImageWrapper = this.element.querySelector(
      '.error-page__image',
    ) as HTMLImageElement;
    errorImageWrapper.setAttribute('src', '/assets/images/error-image.png');
    errorImageWrapper.setAttribute('alt', 'An image of 404 not found error');
  }
}
