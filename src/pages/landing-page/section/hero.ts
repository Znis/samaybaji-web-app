import { navigate } from '../../../router';

export default class Hero {
  static htmlTemplateurl =
    '/assets/templates/pages/landing-page/section/hero.html';
  static element: HTMLElement = document.createElement('section');

  static init(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.classList.add('hero');
          this.element.innerHTML = html;
          this.setEventListeners();
        });
    }
    return this.element;
  }
  static setEventListeners() {
    const orderButton = this.element.querySelector(
      '#hero-order-button',
    ) as HTMLButtonElement;
    orderButton.addEventListener('click', () => {
      history.pushState(null, '', '/menu');
      navigate('/menu');
    });
  }
}
