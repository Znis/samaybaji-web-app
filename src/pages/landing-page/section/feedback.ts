export default class Feedback {
  static htmlTemplateurl =
    './assets/templates/pages/landing-page/section/feedback.html';
  static element: HTMLElement = document.createElement('section');

  static render(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.outerHTML = html;
        });
    }
    return this.element;
  }
}
