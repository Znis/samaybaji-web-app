import Modal from '../components/modal.ts';

export default class Header {
  static htmlTemplateURL = './assets/templates/app-section/header.html';
  static element: HTMLElement = document.createElement('header');

  static render(): HTMLElement {
    fetch(this.htmlTemplateURL)
      .then((response: Response) => response.text())
      .then((html: string) => {
        this.element.outerHTML = html;
        document
          .getElementById('authentication')
          ?.addEventListener('click', () => {
            Modal.toggle();
          });
      });

    return this.element;
  }
}
