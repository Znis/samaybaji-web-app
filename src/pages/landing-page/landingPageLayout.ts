import About from './section/about';
import DownloadApp from './section/downloadApp';
import Feedback from './section/feedback';
import Hero from './section/hero';
import Menu from './section/menu';

export default class LandingPage {
  static element: HTMLElement = document.createElement('div');
  static render(): HTMLElement {
    this.element.setAttribute('id', 'landing-page');
    this.element.appendChild(Hero.render());
    this.element.appendChild(Menu.render());
    this.element.appendChild(About.render());
    this.element.appendChild(Feedback.render());
    this.element.appendChild(DownloadApp.render());

    return this.element;
  }
}
