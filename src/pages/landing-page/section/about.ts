export default class About {
  static htmlTemplateurl =
    './assets/templates/pages/landing-page/section/about.html';
  static element: HTMLElement = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('about');
          this.element.setAttribute('id', 'about');
          this.element.innerHTML = html;
        });
    }
    return this.element;
  }
}
