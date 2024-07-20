export default class DownloadApp {
  static htmlTemplateurl =
    './assets/templates/pages/landing-page/section/download-app.html';
  static element: HTMLElement = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('download-app');
          this.element.innerHTML = html;
        });
    }
    return this.element;
  }
}
