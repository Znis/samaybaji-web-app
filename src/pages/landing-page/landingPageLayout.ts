import Hero from './section/hero';

export default class LandingPage {
  static element: HTMLElement = document.createElement('div');
  static render(): HTMLElement {
    this.element.setAttribute('id', 'landing-page');
    this.element.appendChild(Hero.render());

    return this.element;
  }
}
