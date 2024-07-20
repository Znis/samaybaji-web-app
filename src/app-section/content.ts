import LandingPage from '../pages/landing-page/landingPageLayout';

export default class Content {
  static element: HTMLElement = document.createElement('div');

  static render(): HTMLElement {
    this.element.setAttribute('id', 'content');

    this.element.appendChild(LandingPage.render());

    return this.element;
  }
}
