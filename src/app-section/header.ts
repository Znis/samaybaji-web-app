import AuthCard from '../components/authCard.ts';
import Modal from '../components/modal.ts';

export default class Header {
  static htmlTemplateURL = './assets/templates/app-section/header.html';
  static element: HTMLElement = document.createElement('header');

  static init(): HTMLElement {
    fetch(this.htmlTemplateURL)
      .then((response: Response) => response.text())
      .then((html: string) => {
        this.element.innerHTML = html;
        document
          .getElementById('authentication')
          ?.addEventListener('click', () => {
            Modal.toggle();
            document.getElementById('modal')!.appendChild(AuthCard.init());
          });
      });

    return this.element;
  }
}
