import Hero from './section/hero';
import Menu from './section/menu';

export default class LandingPage {
  static element: HTMLElement = document.createElement('div');
  static render(): HTMLElement {
    this.element.setAttribute('id', 'landing-page');
    this.element.appendChild(Hero.render());
    this.element.appendChild(Menu.render());

    return this.element;
  }
}
