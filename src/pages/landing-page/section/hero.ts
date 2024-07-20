export default class Hero {
  static htmlTemplateurl =
    './assets/templates/pages/landing-page/section/hero.html';
  static element: HTMLElement = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('hero');
          this.element.innerHTML = html;
        });
    }
    return this.element;
  }
}
